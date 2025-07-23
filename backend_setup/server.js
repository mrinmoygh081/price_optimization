const http = require("http");
const app = require("./app");
const { initWebSocket } = require("./services/websocketService");

const PORT = process.env.PORT || 4000;
const server = http.createServer(app);

// Initialize WebSocket
initWebSocket(server);

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
