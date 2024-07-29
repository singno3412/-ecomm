// Modal.js
import React, { useState } from 'react';
import { useSession } from 'next-auth/react';

const Modal = ({ isOpen, onClose }) => {
  const { data: session } = useSession();
  const [tile, setTitle] = useState('');
  const [cont, setContent] = useState('');

  const handleUpload = async () => {
    if (!session) {
      alert('You must be logged in to upload');
      return;
    }
    
    const userId = session.user?.email
    const title = tile
    const content = cont
    console.log({userId,tile,content})
    const response = await fetch('/api/yedhe1/yedhe2', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({userId,title,content}),
    });

    if (response.ok) {
      alert('Upload successful');
      onClose();
    } else {
      alert('Upload failed');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Upload Data</h2>
        <input
          type="text"
          placeholder="Title"
          value={tile}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Content"
          value={cont}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <button onClick={handleUpload}>Upload</button>
      </div>
      <style jsx>{`
        .modal {
          display: block;
          position: fixed;
          z-index: 1;
          padding-top: 100px;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          overflow: auto;
          background-color: rgb(0,0,0);
          background-color: rgba(0,0,0,0.4);
        }
        .modal-content {
          background-color: #fefefe;
          margin: auto;
          padding: 20px;
          border: 1px solid #888;
          width: 80%;
        }
        .close {
          color: #aaa;
          float: right;
          font-size: 28px;
          font-weight: bold;
        }
        .close:hover,
        .close:focus {
          color: black;
          text-decoration: none;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default Modal;
