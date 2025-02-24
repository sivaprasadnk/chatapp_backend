const WebSocket = require('ws');

const PORT = process.env.PORT || 8080;
const server = new WebSocket.Server({ port: PORT });

// const server = new WebSocket.Server({ port: 8080 });

server.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('message', (message) => {
        console.log(`Received: ${message}`);

        // Broadcast message to all connected clients
        server.clients.forEach((client) => {
            if (client !== socket && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    socket.on('close', () => {
        console.log('Client disconnected');
    });
});

console.log('WebSocket server running on ws://localhost:8080');
