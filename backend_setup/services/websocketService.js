const { WebSocketServer } = require("ws");
const { handleWebSocketEvents } = require("../controllers/wsController.js");

const clients = new Map();

let clientIdCounter = 1;

exports.initWebSocket = (server) => {
  const wss = new WebSocketServer({ server });

  wss.on("connection", (ws) => {
    const clientId = clientIdCounter++;
    clients.set(clientId, ws);

    console.log(`🧩 Client ${clientId} connected`);
    ws.send(JSON.stringify({ system: `Welcome Client ${clientId}` }));

    handleWebSocketEvents(ws, clientId, clients);

    ws.on("close", () => {
      clients.delete(clientId);
      console.log(`Client ${clientId} disconnected`);
    });
  });
};
