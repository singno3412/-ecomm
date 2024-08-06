"use client";

import { useSession, signIn, signOut } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Page({ params }) {
  const { data: session, status } = useSession();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [chatId, setChatId] = useState<string | null>(null);
  const router = useRouter();

  const createChatLink = async () => {
    const res = await fetch('/api/create-link');
    const data = await res.json();
    setChatId(data.chatId);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/yedhe1/yedhe3/${params.slug}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return (
      <div>
        <div className="flex w-full h-screen flex-col gap-4">
          <div className="skeleton h-32 w-full"></div>
          <div className="skeleton h-4 w-28"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="card-container">
        {data.map(item => (
          <div key={item.id} className="card">
            <div>
              <h1 className='text-xl'>{item.title}</h1>
              <p>{item.content}</p>
            </div>
            {session && (
              <div>
                <button onClick={createChatLink}>Generate Link</button>
                {chatId && (
                  <div>
                    <p>Share this link to start chatting:</p>
                    <a href={`/chat/${chatId}?owner=${item.user_id}&contacter=${session.user?.email}&blog_id=${item.id}`}>
                      {`http://localhost:3000/chat/${chatId}?owner=${item.user_id}&contacter=${session.user?.email}&blog_id=${item.id}`}
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
