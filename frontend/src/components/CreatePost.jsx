import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

export default function CreatePost() {
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);
  const [err, setErr] = useState('');
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('text', text);
      if (image) formData.append('image', image);

      await api.post('/posts', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      nav('/');
    } catch (error) {
      setErr(error.response?.data?.message || 'Error creating post');
    }
  };

  return (
    <div className="col-md-8 offset-md-2">
      <h3>Create Post</h3>
      {err && <div className="alert alert-danger">{err}</div>}
      <form onSubmit={submit}>
        <textarea
          className="form-control mb-2"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What's on your mind?"
          rows={4}
        />
        <input
          type="file"
          className="form-control mb-2"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <button className="btn btn-primary">Post</button>
      </form>
    </div>
  );
}
