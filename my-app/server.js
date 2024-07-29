const express = require('express');
const next = require('next');
const http = require('http');
const { Server } = require('socket.io');
const { v4: uuidv4 } = require('uuid'); // นำเข้า uuid

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  const httpServer = http.createServer(server);
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
    },
  });

  io.on('connection', (socket) => {
    console.log('New client connected');

    const username = `User-${uuidv4().slice(0, 8)}`;

    socket.on('join', (chatId) => {
      console.log(`${username} joined chat room: ${chatId}`);
      socket.join(chatId);
      // เก็บ chatId ไว้ใน socket instance
      socket.chatId = chatId;

      const usersInRoom = io.sockets.adapter.rooms.get(chatId)?.size || 0;
      io.to(chatId).emit('userCount', usersInRoom);
    });

    socket.on('sendMessage', (message, callback) => {
      console.log(`Message received from ${username}: ${message}`);
      const chatId = socket.chatId; // ดึง chatId จาก socket instance
      io.to(chatId).emit('message', { username, message });
      console.log(`Success ${chatId}`, { username, message });
      callback();
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected');
      const chatId = socket.chatId; // ดึง chatId จาก socket instance
      if (chatId) {
        socket.leave(chatId);
        const usersInRoom = io.sockets.adapter.rooms.get(chatId)?.size || 0;
        io.to(chatId).emit('userCount', usersInRoom);
      }
    });
  });

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  httpServer.listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
});
