
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

// Create app and server
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Serve static files (frontend)
app.use(express.static('public'));

// Socket.IO logic
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Listen for chat messages
    socket.on('chat message', (msg) => {
        console.log('Message received:', msg);

        // Broadcast to all connected clients
        io.emit('chat message', msg);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
