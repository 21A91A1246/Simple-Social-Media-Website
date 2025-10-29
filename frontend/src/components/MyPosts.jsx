import React, { useEffect, useState } from "react";
import axios from "axios";

const MyPosts = ({ token }) => {
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const [editText, setEditText] = useState("");

  // Default avatar if no profile image is available
  const defaultAvatar = "../avatar.jpeg"; // Place this image in /public folder

  // Fetch user's posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        if (!token) return;

        const res = await axios.get("http://localhost:5000/api/posts/my-posts", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPosts(res.data);
      } catch (err) {
        console.error("Error fetching user posts:", err.response?.data || err.message);
      }
    };
    fetchPosts();
  }, [token]);

  // Delete post
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/posts/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Error deleting post:", err.response?.data || err.message);
      alert("Failed to delete post");
    }
  };

  // Start editing
  const handleEdit = (post) => {
    setEditingPost(post._id);
    setEditText(post.text);
  };

  // Save edited post
  const handleSave = async (id) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/posts/edit/${id}`,
        { text: editText },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setPosts((prev) => prev.map((p) => (p._id === id ? res.data.post : p)));
      setEditingPost(null);
      setEditText("");
    } catch (err) {
      console.error("Error updating post:", err.response?.data || err.message);
      alert("Failed to update post");
    }
  };

  return (
    <div className="col-md-8 offset-md-2">
      <h3 className="mb-4 text-center">My Posts</h3>

      {posts.length === 0 ? (
        <p className="text-center text-muted">You haven’t created any posts yet.</p>
      ) : (
        posts.map((post) => (
          <div key={post._id} className="card mb-3 shadow-sm border-1 rounded-3">
            <div className="card-body">
              {/* Header with profile picture and date */}
              <div className="d-flex align-items-center mb-2">
                <img
                  src={
                    post.user?.profileImage
                      ? `http://localhost:5000${post.user.profileImage}`
                      : defaultAvatar
                  }
                  alt="Profile"
                  className="rounded-circle me-2"
                  style={{ width: "40px", height: "40px", objectFit: "cover" }}
                />
                <div>
                  <strong>{post.userName || "Unknown User"}</strong>
                  <div className="text-muted small">
                    {new Date(post.createdAt).toLocaleString([], {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </div>

              {editingPost === post._id ? (
                <>
                  <textarea
                    className="form-control mb-2"
                    rows="3"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                  <button
                    className="btn btn-success btn-sm me-2"
                    onClick={() => handleSave(post._id)}
                  >
                    Save
                  </button>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => setEditingPost(null)}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <p className="mt-2">{post.text}</p>

                    <img
                      src={post.imageUrl?`http://localhost:5000${post.imageUrl}`:'/defaultPost.png'}

                      alt="Post"
                      className="img-fluid rounded mb-2"
                      style={{ maxHeight: "400px", objectFit: "cover" }}
                    />
                  <div className="d-flex justify-content-end">
                    <button
                      className="btn btn-outline-primary btn-sm me-2"
                      onClick={() => handleEdit(post)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => handleDelete(post._id)}
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyPosts;
