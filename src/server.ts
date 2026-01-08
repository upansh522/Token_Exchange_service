import Fastify from "fastify";
import websocket from "@fastify/websocket";
import dotenv from "dotenv";

dotenv.config();

const app = Fastify({ logger: true });

app.register(websocket);

app.listen({ port: Number(process.env.PORT) }, () => {
  console.log("Server running on port", process.env.PORT);
});