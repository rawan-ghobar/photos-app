const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('chatMessage', (message) => {
    console.log('Message received:', message);
    io.emit('chatMessage', message); 
  });

  socket.on('disconnect', () => {
    console.log('Disconnected');
  });
});

server.listen(3001, () => {
  console.log('WebSocket server running at http://localhost:3001');
});
