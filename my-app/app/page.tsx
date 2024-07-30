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
    return <div>Loading...</div>;
  }
  

  if (session) {
    const userId = session.user?.email;
    const title =  session.user?.email;
    const content =  String(randomBytes(256));
    return (
      <>
      
        Signed in as {session.user?.email} {session.user?.id}<br />
        <button onClick={() => signOut()}>Sign Out</button>
        <button onClick={() => setModalOpen(true)}>Open Modal</button>
        <a href='/createapp'>Go create APp</a>
        <a href='/blog'>Go create Blog</a>
        <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
          
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
