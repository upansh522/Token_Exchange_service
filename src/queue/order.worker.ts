import { Worker } from "bullmq";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../.env") });
import { getBestDexQuote } from "../dex/dex.router";
import { executeSwap } from "../dex/swap.executor";
import { broadcast } from "../websocket/socket.manager";
import { sleep } from "../utils/sleep";
import { Order } from "../types/order";


new Worker(
    "order-queue",
    async (job) => {
        const { orderId, tokenIn, tokenOut, amount } =
            job.data as Order;

        try {
            // Order received
            broadcast({
                orderId,
                status: "pending"
            });

            await sleep(200);

            // Routing: compare DEX prices
            broadcast({
                orderId,
                status: "routing"
            });

            const bestQuote = await getBestDexQuote(
                tokenIn,
                tokenOut,
                amount
            );

            broadcast({
                orderId,
                status: "routing",
                selectedDex: bestQuote.dex,
                quotedPrice: bestQuote.price
            });

            // Building transaction
            broadcast({
                orderId,
                status: "building"
            });

            await sleep(500);

            // Submitting transaction
            broadcast({
                orderId,
                status: "submitted"
            });

            // Execute swap (mocked)
            const result = await executeSwap(
                bestQuote.dex,
                { orderId, tokenIn, tokenOut, amount },
                bestQuote.price
            );

            // Confirmed
            broadcast({
                orderId,
                status: "confirmed",
                dex: result.dex,
                executedPrice: result.executedPrice,
                txHash: result.txHash
            });

            return result;
        } catch (error: any) {
            // Failed (BullMQ will retry automatically)
            broadcast({
                orderId,
                status: "failed",
                error: error.message || "Order execution failed"
            });

            // Important: rethrow so BullMQ retries
            throw error;
        }
    },
    {
        concurrency: 10,
        connection: {
            host: process.env.REDIS_HOST,
            port: Number(process.env.REDIS_PORT)
        }
    }
);
