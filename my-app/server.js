const express = require('express');
const next = require('next');
const http = require('http');
const { Server } = require('socket.io');
const mysql = require('mysql2/promise'); // นำเข้า mysql2/promise

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'next-js-registration-login-example'
};

async function initializeDatabase() {
  const connection = await mysql.createConnection(dbConfig);

  await connection.execute(`
    CREATE TABLE IF NOT EXISTS messages (
      id INT AUTO_INCREMENT PRIMARY KEY,
      chatId VARCHAR(255) NOT NULL,
      username VARCHAR(255) NOT NULL,
      message TEXT NOT NULL,
      timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  return connection;
}

let dbConnection;

app.prepare().then(async () => {
  dbConnection = await initializeDatabase().catch(err => {
    console.error('Error initializing database:', err);
    process.exit(1); // Exit the process if database initialization fails
  });

  const server = express();
  const httpServer = http.createServer(server);
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
    },
  });

  io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('join', async (chatId) => {
      console.log(`User joined chat room: ${chatId}`);
      socket.join(chatId);
      socket.chatId = chatId;

      const [messages] = await dbConnection.execute(
        'SELECT * FROM messages WHERE chatId = ? ORDER BY timestamp ASC',
        [chatId]
      );
      socket.emit('loadMessages', messages);

      const usersInRoom = io.sockets.adapter.rooms.get(chatId)?.size || 0;
      io.to(chatId).emit('userCount', usersInRoom);
    });

    socket.on('sendMessage', async (data, callback) => {
      const { chatId, username, message } = data;
      console.log(`Message received from ${username}: ${message}`);

      const messageText = typeof message === 'object' ? message.message : message;

      const [result] = await dbConnection.execute(
        'INSERT INTO messages (chatId, username, message) VALUES (?, ?, ?)',
        [chatId, username, messageText]
      );

      const newMessage = {
        id: result.insertId,
        chatId,
        username,
        message: messageText,
        timestamp: new Date()
      };

      io.to(chatId).emit('message', newMessage);
      console.log(`Success ${chatId}`, newMessage);
      callback();
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected');
      const chatId = socket.chatId;
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
