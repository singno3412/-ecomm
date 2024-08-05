"use client";

import { UploadButton } from "../utils/uploadthing";
import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  }
});

const Modal = ({ isOpen, onClose }) => {
  const { data: session } = useSession();
  const [tile, setTitle] = useState('');
  const [cont, setContent] = useState('');
  const [uploadedImage, setUploadedImage] = useState(null);
  const [userType, setUserType] = useState('Seller');

  const handleUpload = async () => {
    if (!session) {
      Swal.fire('Error', 'You must be logged in to upload', 'error');
      return;
    }

    if (!tile || !cont || !uploadedImage) {
      Swal.fire('Error', 'Title , Content and Image are required', 'error');
      return;
    }

    const userId = session.user?.email;
    const title = tile;
    const content = cont;
    console.log({ userId, title, content, userType });
    const response = await fetch('/api/yedhe1/yedhe2', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, title, content, uploadedImage, userType }),
    });

    if (response.ok) {
      Toast.fire('Success', 'Upload successful', 'success');
      onClose();
    } else {
      Swal.fire('Error', 'Upload failed', 'error');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <button className="btn btn-sm btn-circle absolute right-2 top-2" onClick={onClose}>✕</button>
        <h2 className="font-bold text-lg mb-4">Upload Data</h2>
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Title</span>
          </label>
          <input
            required
            type="text"
            placeholder="Title"
            value={tile}
            onChange={(e) => setTitle(e.target.value)}
            className="input input-bordered w-full"
          />
        </div>
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Content</span>
          </label>
          <textarea
            required
            placeholder="Content"
            value={cont}
            onChange={(e) => setContent(e.target.value)}
            className="textarea textarea-bordered w-full"
          ></textarea>
        </div>
        <div className=""> Type
          <label className="swap ml-3 items-baseline bg-white p-1.5 bg-opacity-5 rounded-xl">
            <input
              type="checkbox"
              onChange={(e) => {
                const newType = e.target.checked ? 'Buyer' : 'Seller';
                setUserType(newType);
                console.log(newType);
              }}
            />
            <div className="swap-on">Buyer</div>
            <div className="swap-off">Seller</div>
          </label>
        </div>
        {uploadedImage && (
          <div className="mt-4 mb-4 p-3">
            <img src={uploadedImage} alt="Uploaded" className="w-full rounded-md h-72"/>
          </div>
        )}
        <UploadButton
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            console.log("Files: ", res);
            Toast.fire({
              icon: "success",
              title: "Upload Success"
            });
            setUploadedImage(res[0]?.url);
          }}
          onUploadError={(error) => {
            Toast.fire({
              icon: "error",
              title: `Upload Failed ${error}`
            });
          }}
        />
        <div className="modal-action">
          <button onClick={handleUpload} className="btn btn-primary">Upload</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
