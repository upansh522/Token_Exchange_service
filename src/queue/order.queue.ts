import { Queue } from "bullmq";

export const orderQueue = new Queue("order-queue", {
  connection: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT)
  }
});
