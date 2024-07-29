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
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h1>Normal Page {params.slug}</h1>
      <div className="card-container">
        {data.map(item => (
          <a key={item.id} href={`/blog/${item.id}`} className="card">
            <div>
              <h2>{item.title}</h2>
              <p>{item.content}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
