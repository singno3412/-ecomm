"use client";

import React, { useEffect, useState } from 'react';

export default function Page() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/yedhe1');
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

  const truncateText = (text, length) => {
    if (text.length <= length) {
      return text;
    }
    return text.substring(0, length) + '...';
  };

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
      <h1 className="text-2xl font-bold mb-4">Normal Page</h1>
      <div className='p-4'>
        <div className="flex justify-center items-center">
          <a className='card bg-base-300 hover:bg-base-400 rounded-box grid h-20 flex-grow place-items-center text-xl font-bold' href="/blog">Buyer</a>
          <div className="divider divider-horizontal">OR</div>
          <a className='card bg-base-300 rounded-box grid h-20 flex-grow place-items-center text-xl font-bold' href="/blog">Seller</a>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-items-center">
        {data.map(item => (
          <div className="indicator" key={item.id}>
            <a href={`/blog/${item.id}`} className="card bg-base-100 shadow-lg p-4">
              <div className="card bg-base-100 h-96 w-96 shadow-xl">
                <figure>
                  <img src={item.image} alt="Shoes" />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">
                    {truncateText(item.title, 17)}
                    <div className="badge badge-secondary">NEW</div>
                  </h2>
                  <p>{truncateText(item.content, 37)}</p>
                  <span className="indicator-item badge badge-ghost">{item.type}</span>
                  <div className="card-actions justify-end">
                    <div className="badge badge-outline">Fashion</div>
                    <div className="badge badge-outline">Products</div>
                  </div>
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
