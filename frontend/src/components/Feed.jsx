import React, { useEffect, useState } from 'react';
import { FaHeart, FaRegComment, FaPaperPlane } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import api from '../api'; // your axios instance

export default function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const res = await api.get('/posts');
        setPosts(res.data);
      } catch (err) {
        console.error('Error loading posts', err);
      }
    }
    load();
  }, []);

  const toggleLike = async (postId) => {
    try {
      const res = await api.post(`/posts/${postId}/like`);
      const { liked, likeCount } = res.data;

      setPosts(prev =>
        prev.map(p =>
          p._id === postId
            ? { ...p, liked, likeCount }
            : p
        )
      );
    } catch (err) {
      console.error('Like error', err);
    }
  };


  return (
    <div
      className="container mt-4 mb-5 d-flex flex-column align-items-center"
      style={{ minHeight: '100vh' }}
    >
      <h3 className="text-center mb-4">Feed</h3>

      {posts.map((p) => (
        <div
          key={p._id}
          className="card mb-4 shadow-sm"
          style={{
            maxWidth: '405px',
            borderRadius: '12px',
            border: '1px solid #ddd',
            overflow: 'hidden',
          }}
        >
          {/* --- Header --- */}
          <div className="d-flex align-items-center p-2">
            <Link to={`/userProfile/${p.userId}`}>
              <img
                src={p.profilePic || '../avatar.jpeg'}
                alt="Profile"
                className="rounded-circle me-2"
                style={{ width: '40px', height: '40px', objectFit: 'cover' }}
              /> 
              </Link>
            <div>
              <strong>{p.userName || 'Unknown User'}</strong>
              <div className="text-muted small">
                {new Date(p.createdAt).toLocaleString([], {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </div>
            </div>
          </div>

          {/* --- Image --- */}
          <div style={{ position: 'relative' }}>
            <img
              src={p.imageUrl?`${import.meta.env.VITE_BACKEND_URL}${p.imageUrl}`:'../defaultPost.png'}
              alt="Post"
              className="img-fluid"
              style={{
                width: '100%',
                height: '405px',
                objectFit: 'cover',
                backgroundColor: '#000',
              }}
            />

            {/* Optional caption overlay (like "Get Well Soon, PRATIKA!") */}
            {p.overlayText && (
              <div
                style={{
                  position: 'absolute',
                  bottom: '15%',
                  width: '100%',
                  color: 'white',
                  textAlign: 'center',
                  fontWeight: '600',
                  fontSize: '1.6rem',
                  textShadow: '0 2px 6px rgba(0,0,0,0.7)',
                }}
              >
                {p.overlayText}
              </div>
            )}
          </div>

          {/* --- Actions and Description --- */}
          <div className="p-3">
            {/* Icons */}
            <div className="d-flex align-items-center gap-3 mb-2">
              <FaHeart
                size={22}
                style={{
                  cursor: 'pointer',
                  color: p.liked ? 'red' : '#555',
                }}
                onClick={() => toggleLike(p._id)}
              />
              <FaRegComment size={22} style={{ cursor: 'pointer' }} />
              <FaPaperPlane size={22} style={{ cursor: 'pointer' }} />
            </div>

            {/* Likes */}
            <p>{p.likeCount ?? p.likes?.length ?? 0} likes</p>

            {/* Caption */}
            <p className=" mb-1" style={{ fontSize: '0.95rem' }}>
              
              {p.text || 'No description available'}
            </p>

            {/* Comments link */}
            <p
              className="text-muted small mb-0"
              style={{ cursor: 'pointer', fontSize: '0.85rem' }}
            >
              View all {p.comments?.length || 0} comments
            </p>

            {/* Add comment box */}
            <div className="border-top mt-2 pt-2 d-flex align-items-center">
              <input
                type="text"
                className="form-control border-0 shadow-none p-0"
                placeholder="Add a comment..."
                style={{ fontSize: '0.9rem' }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
