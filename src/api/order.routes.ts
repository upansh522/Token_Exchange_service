import { FastifyInstance } from "fastify";
import crypto from "crypto";
import { sql } from "../db/postgres";
import { orderQueue } from "../queue/order.queue";
import { OrderSchema } from "../zod/order";
import { registerSocket } from "../websocket/socket.manager";

export async function orderRoutes(app: FastifyInstance) {
    app.post("/api/orders/execute", async (req, reply) => {
        const result = OrderSchema.safeParse(req.body);

        if (!result.success) {
            return reply.status(400).send({ error: "Invalid input", details: result.error.format });
        }

        const { tokenIn, tokenOut, amount } = result.data;
        const orderId = crypto.randomUUID();

        try {
            await sql`INSERT INTO orders (id, token_in, token_out, amount, status) VALUES (${orderId}, ${tokenIn}, ${tokenOut}, ${amount}, 'pending')`;

            await orderQueue.add("execute-order", {
                orderId,
                tokenIn,
                tokenOut,
                amount
            });
        } catch (error) {
            console.error("Error executing order:", error);
            return reply.status(500).send({ error: "Internal Server Error" });
        }

        return { orderId };
    });

    app.get(
        "/ws/orders",
        { websocket: true },
        (connection, req) => {
            registerSocket(connection.socket);
        }
    );
}
