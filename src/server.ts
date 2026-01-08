import Fastify from "fastify";
import websocket from "@fastify/websocket";
import dotenv from "dotenv";
import { orderRoutes } from "./api/order.routes";

dotenv.config();

const app = Fastify({ logger: true });

app.register(orderRoutes);
app.register(websocket);

app.listen({ port: Number(process.env.PORT) }, () => {
  console.log("Server running on port", process.env.PORT);
});