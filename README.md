# Token_Exchange_service

## Public URIs
Api= https://token-exchange-service.onrender.com/api/orders/execute
WebSocket API= wss://token-exchange-service.onrender.com/ws/orders

## Tech Stack Used
Node.js – Backend runtime
TypeScript – Type-safe development
Fastify – HTTP API and WebSocket server
BullMQ – Queue-based order processing
Redis – Job queue and state management
PostgreSQL (Neon) – Persistent order storage
WebSockets – Real-time order status updates
Render – Cloud deployment and hosting

## Project Overview

This project is a backend Order Execution Engine designed to simulate how decentralized exchange (DEX) trading systems process and execute orders. It accepts market orders via a REST API, routes them to the best available execution venue by comparing prices from multiple DEXs, and provides real-time execution status updates through WebSockets.

The system uses a queue-based architecture to handle concurrent order processing reliably and scalably. Each order follows a clearly defined lifecycle—from submission and routing to execution confirmation—making the execution flow transparent and observable. While blockchain interactions are mocked, the overall design closely mirrors real-world trading infrastructure and can be easily extended to support additional order types or real on-chain execution.

## Why I Choose Market Order Type
Market orders were chosen because they execute immediately at the best available price, making them ideal for demonstrating DEX routing, execution flow, and real-time status updates without additional conditional logic. This allows the system to focus on core infrastructure—queueing, routing, concurrency, and WebSocket streaming—which can later be extended to support limit or sniper orders with minimal changes.

## How to support other two order types

### 1. Limit Orders: 
Add a target price to the order payload and continuously compare it against DEX quotes; execute the order only when the market price meets or exceeds the specified limit.

### 2. Sniper Orders:
Attach execution triggers based on external events such as token launch, liquidity migration, or a specific timestamp; once the trigger condition is met, the existing routing and execution pipeline can be reused without modification.

## Flow Explanation:

1. Client submits a market order via the HTTP API.
2. Fastify API Server validates the request and persists the order in PostgreSQL.
3. The order is enqueued into BullMQ (Redis) for asynchronous processing.
4. A Worker consumes jobs from the queue (up to 10 concurrently).
5. The worker queries Raydium and Meteora (mocked DEX services) in parallel.
6. The DEX Router selects the best execution venue based on effective price.
7. The swap execution is simulated and finalized.
8. WebSocket Server streams real-time lifecycle updates to connected clients.


## Design Decisions
1. Market orders were chosen to clearly demonstrate order routing, execution flow, concurrency, and real-time updates without conditional execution logic.
2. BullMQ with Redis is used to decouple API handling from execution and to support concurrent processing, retries, and reliability.
3. DEX routing is abstracted into a separate layer that compares Raydium and Meteora quotes and selects the best execution venue.
4. WebSockets provide real-time visibility into the order lifecycle, allowing multiple orders to be tracked in parallel.
5. Execution is mocked to focus on backend architecture while keeping the system easily extendable to real on-chain execution.

 ## setup instruction
 1. Install dependencies
 
npm install

 2. Configure environment variables

PORT=3000
DATABASE_URL=<PostgreSQL URL>
REDIS_URL=<Redis URL>

3. Start the application

npm run dev

4. Access APIs
test using Postman




