import { Queue } from "bullmq";
import dotenv from "dotenv";
import IORedis from "ioredis";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const connection = new IORedis(process.env.REDIS_URL!, {
  maxRetriesPerRequest: null, // Required for BullMQ
  tls: {
    rejectUnauthorized: false
  }
});

export const orderQueue = new Queue("order-queue", {
  connection: connection as any
});