const sockets = new Set<any>();

export function registerSocket(socket: any) {
  sockets.add(socket);

  socket.on("close", () => {
    sockets.delete(socket);
  });
}

export function broadcast(payload: any) {
  const message = JSON.stringify(payload);

  for (const socket of sockets) {
    socket.send(message);
  }
}
