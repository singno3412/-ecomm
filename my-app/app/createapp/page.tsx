"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [chatId, setChatId] = useState<string | null>(null);
  const router = useRouter();

  const createChatLink = async () => {
    const res = await fetch('/api/create-link');
    const data = await res.json();
    setChatId(data.chatId);
  };

  return (
    <div>
      <h1>Create a Chat Link</h1>
      <button onClick={createChatLink}>Generate Link</button>
      {chatId && (
        <div>
          <p>Share this link to start chatting:</p>
          <a href={`/chat/${chatId}`}>{`http://localhost:3000/chat/${chatId}`}</a>
        </div>
      )}
    </div>
  );
}
