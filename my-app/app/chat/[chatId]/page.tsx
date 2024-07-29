"use client"

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import io from 'socket.io-client';

let socket;

export default function ChatPage() {
  const { chatId } = useParams();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    console.log('Connecting to socket...');
    socket = io('http://localhost:3000'); // URL ของเซิร์ฟเวอร์ Socket.IO

    socket.on('connect', () => {
      console.log('Socket connected');
      socket.emit('join', chatId);
    });

    socket.on('message', (data) => {
      console.log('Message received =>:', data); // Debug log
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    socket.on('userCount', (count) => {
      console.log('User count:', count); // Debug log
      setUserCount(count);
    });

    return () => {
      if (socket) {
        console.log('Disconnecting socket...');
        socket.disconnect();
      }
    };
  }, [chatId]);

  const sendMessage = () => {
    if (socket && message.trim()) {
      console.log('Sending message:', message); // Debug log
      socket.emit('sendMessage', message, () => {
        setMessage('');
      });
    }
  };

  return (
    <div>
      <h1>Chat Room: {chatId}</h1>
      <p>Users in room: {userCount}</p>
      <div>
        {messages.map((msg, index) => (
          <div key={index}><strong>{msg.username}:</strong> {msg.message}</div>
        ))}
      </div>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' ? sendMessage() : null}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
