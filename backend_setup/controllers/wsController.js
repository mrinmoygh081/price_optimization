export function handleWebSocketEvents(ws, clientId, clients) {
  ws.on("message", (rawData) => {
    let data;
    try {
      data = JSON.parse(rawData);
    } catch (err) {
      return ws.send(JSON.stringify({ error: "Invalid JSON" }));
    }

    if (data.type === "broadcast") {
      for (const [id, client] of clients.entries()) {
        if (client.readyState === client.OPEN) {
          client.send(
            JSON.stringify({
              from: clientId,
              message: data.message,
            })
          );
        }
      }
    } else if (data.type === "private" && data.to) {
      const target = clients.get(data.to);
      if (target && target.readyState === target.OPEN) {
        target.send(
          JSON.stringify({
            from: clientId,
            message: data.message,
          })
        );
      } else {
        ws.send(JSON.stringify({ error: "Client not found or closed" }));
      }
    } else {
      ws.send(JSON.stringify({ error: "Unknown message type" }));
    }
  });
}
