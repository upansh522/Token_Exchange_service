import "./env";
import Fastify from "fastify";
import websocket from "@fastify/websocket";
import { orderRoutes } from "./api/order.routes";

const app = Fastify({ logger: true });

app.register(websocket);
app.register(orderRoutes);

const PORT = Number(process.env.PORT);

app.listen({ port: PORT }, () => {
    console.log("Server running on port", PORT);
});