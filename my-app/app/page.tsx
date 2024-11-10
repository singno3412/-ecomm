"use client";

import { useSession, signIn, signOut } from 'next-auth/react';
import React , { useState }from 'react';
import Modal from '@/components/Modal'
import { getRandomValues, randomBytes, randomInt, randomUUID } from 'crypto';


async function sendData(UID, Title, Content) {
  const userId = UID
  const title = Title
  const content = Content
  const response = await fetch('/api/yedhe1/yedhe2', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId,title,content }),
  });

  const data = await response.json();
}



const Page: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const { data: session, status } = useSession();
  if (status === 'loading') {
    return <div>      <div className="flex w-full h-screen flex-col gap-4">
    <div className="skeleton h-32 w-full"></div>
    <div className="skeleton h-4 w-28"></div>
    <div className="skeleton h-4 w-full"></div>
    <div className="skeleton h-4 w-full"></div>
  </div></div>;
  }
  

  if (session) {
    const userId = session.user?.email;
    const title =  session.user?.email;
    const content =  String(randomBytes(256));
    return (
      <>
            <div className=''>
                <h1 className='text-xl'>Hottest Blog</h1>
                
            </div> 
                 </>
    );
  }

  return (
    <div>

      Not Signed In <br />
      <button onClick={() => signIn()}>Sign In with Discord</button>
      
    </div>
  );
};

export default Page;
