const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const port = process.env.PORT || 3000;

var clients = {};

app.get("/", (req, res) => {
    res.send("Hello 🚀"); // Serve the HTML file
});

io.on('connection', (socket) => {
    console.log(socket.id, '- connected');
    socket.on("signin", (id) => {
        clients[id] = socket;
        console.log(clients);
    });

    socket.on('message', (message) => {
        console.log('New message:', message);
        let targetId = message.targetId;
        if (clients[targetId]) {
            clients[targetId].emit("message", message);
        }
        // io.emit('newMessage', message.id); // Send to everyone
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

server.listen(port, "0.0.0.0", () => {
    console.log(`Server is up on port ${port} 🚀`);
});
