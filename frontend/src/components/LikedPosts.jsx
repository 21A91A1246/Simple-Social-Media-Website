import React, { useEffect, useState } from "react";
import api from "../api";

const LikedPosts = () => {
  const [likedPosts, setLikedPosts] = useState([]);
  const defaultAvatar = "../avatar.jpeg"; // place this file in /public

  useEffect(() => {
    async function load() {
      try {
        const res = await api.get("/posts/liked/me");
        setLikedPosts(res.data);
      } catch (err) {
        console.error("Error loading liked posts:", err);
      }
    }
    load();
  }, []);

  return (
    <div className="col-md-8 offset-md-2">
      <center>
        <h3>Liked Posts</h3>
      </center>

      {likedPosts.length === 0 ? (
        <p className="text-center mt-3 text-muted">No liked posts yet.</p>
      ) : (
        <div className="list-group mt-3">
          {likedPosts.map((p) => (
            <div
              key={p._id}
              className="list-group-item mb-3 border-1 shadow-sm rounded-3"
            >
              {/* Profile Header */}
              <div className="d-flex align-items-center mb-2">
                <img
                  src={
                    p.user?.profileImage
                      ? `${import.meta.env.VITE_BACKEND_URL}${p.user.imageUrl}`
                      : defaultAvatar
                  }
                  alt="Profile"
                  className="rounded-circle me-2"
                  style={{ width: "40px", height: "40px", objectFit: "cover" }}
                />
                <div>
                  <strong>{p.userName || "Unknown User"}</strong>
                  <div className="text-muted small">
                    {new Date(p.createdAt).toLocaleString([], {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </div>

              {/* Post text */}
              <p className="mt-2">{p.text}</p>

              {/* Post image */}
              
                <img
                  src={p.imageUrl?`${import.meta.env.VITE_BACKEND_URL}${p.imageUrl}`:'/defaultPost.png'}
                  alt="Post"
                  className="img-fluid rounded mb-2"
                  style={{ maxHeight: "400px", objectFit: "cover" }}
                />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LikedPosts;
