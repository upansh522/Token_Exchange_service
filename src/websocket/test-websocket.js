// Run this script with: node src/websocket/test-websocket.js

console.log("Connecting to WebSocket...");

// Node.js v22 has native WebSocket support
const socket = new WebSocket('ws://localhost:3000/ws/orders');

socket.onopen = () => {
    console.log('✅ Connected to WebSocket server!');
};

socket.onmessage = (event) => {
    console.log('📩 Received message:', event.data);
};

socket.onerror = (error) => {
    // In Node.js, the error object might look different than in browser
    console.error('❌ WebSocket error:', error.message || error);
};

socket.onclose = () => {
    console.log('🔌 WebSocket connection closed');
};

// Keep the process alive for a bit to listen
setTimeout(() => {
    console.log('Test finished duration (10s), closing...');
    socket.close();
}, 5000);
