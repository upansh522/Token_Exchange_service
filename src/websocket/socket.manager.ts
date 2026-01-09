const sockets = new Set<any>();

export function registerSocket(socket: any) {
  if (!socket) return;

  sockets.add(socket);
  console.log("WebSocket connected. Total:", sockets.size);

  socket.on("close", () => {
    sockets.delete(socket);
    console.log("WebSocket disconnected. Total:", sockets.size);
  });

  socket.on("error", (err: any) => {
    console.error("WebSocket error:", err);
    sockets.delete(socket);
  });
}

export function broadcast(payload: any) {
  const message = JSON.stringify(payload);

  for (const socket of sockets) {
    if (socket.readyState === 1) {
      socket.send(message);
    }
  }
}
