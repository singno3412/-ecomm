"use client"

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import io from 'socket.io-client';
import { useSession, signIn, signOut } from 'next-auth/react';

let socket;

export default function ChatPage() {
  const { chatId } = useParams();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [userCount, setUserCount] = useState(0);
  const { data: session, status } = useSession();
  
  useEffect(() => {
    console.log('Connecting to socket...');
    socket = io('http://localhost:3000'); // URL ของเซิร์ฟเวอร์ Socket.IO

    socket.on('connect', () => {
      console.log('Socket connected');
      socket.emit('join', chatId);
    });

    socket.on('loadMessages', (loadedMessages) => {
      setMessages(loadedMessages);
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

  if (session) {
    const sendMessage = () => {
      const userId = session.user?.email;
      if (socket && message.trim()) {
        console.log('Sending message:', message); // Debug log
        socket.emit('sendMessage', { chatId, username: userId, message }, () => {
          setMessage('');
        });
      }
    };

    return (
      <div>
        <h1>Chat Room: {chatId}</h1>
        <p>Users in room: {userCount}</p>
        <div className="chat">
          <div className="chat-bubble">
          {messages.map((msg, index) => (
            <div key={index}><strong>{msg.username}:</strong> {msg.message}</div>
          ))}
          </div>
        </div>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className='input input-bordered w-full max-w-xs'
          onKeyPress={(e) => e.key === 'Enter' ? sendMessage() : null}
        />
        <button className="btn btn-secondary" onClick={sendMessage}>Send</button>
      </div>
    );
  }

  return (
    <><h1>Please LOGIN</h1></>
  );
}
