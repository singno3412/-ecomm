"use client"


import React, { useEffect, useState } from 'react';

export default function Page({ params }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

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
    return <div>      <div className="flex w-full h-screen flex-col gap-4">
    <div className="skeleton h-32 w-full"></div>
    <div className="skeleton h-4 w-28"></div>
    <div className="skeleton h-4 w-full"></div>
    <div className="skeleton h-4 w-full"></div>
  </div></div>;
  }
  return (
    <div>
      <div className="card-container">
        {data.map(item => (
          <a key={item.id} className="card">
            <div>
              <h1 className='text-xl'>{item.title}</h1>
              <text>{item.content}</text>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
