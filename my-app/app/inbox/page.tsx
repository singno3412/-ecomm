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

  useEffect(() => {
    if (session && session.user) { // ตรวจสอบว่ามี session และ session.user
      const fetchData = async () => {
        try {
          const response = await fetch(`http://localhost:3000/api/getData/${session.user.email}`);
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
    }
  }, [session]); // เพิ่ม session ใน dependencies array

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
        <div className="dropdown dropdown-hover">
            <div tabIndex={0} role="button" className="btn m-1">Type</div>
            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                <li><a href='/inbox'>Inbox</a></li>
                <li><a href='/inbox/mydm'>My Message</a></li>
            </ul>
        </div>
      {data.map(item => (
        <div key={item.id} className="card">
            <div role="alert" className="alert shadow-lg">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="stroke-info h-6 w-6 shrink-0">
                <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <div>
                <h3 className="font-bold">{item.blogId} | {item.contacter}</h3>
                <div className="text-xs">{item.chatId}</div>
            </div>
            <a href={`/chat/${item.chatId}?owner=${item.owner}&contacter=${session.user?.email}&blog_id=${item.blogId}`}><button className="btn btn-sm">See</button></a>
            </div>
        </div>
      ))}
    </div>
  );
}
