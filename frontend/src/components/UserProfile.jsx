import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const UserProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/user/user/${id}`)
      .then((res) => {
        setUser(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching user profile:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="text-center mt-5 fw-semibold fs-5">Loading user profile...</div>;
  }

  if (!user) {
    return <div className="text-center mt-5 text-danger fs-5">User not found.</div>;
  }

  return (
    <div className="container mt-4 mb-5 d-flex justify-content-center">
      <div
        className="card shadow-lg border-0 p-4 rounded-4"
        style={{
          maxWidth: "650px",
          width: "100%",
          background: "linear-gradient(135deg, #f9fafb 0%, #f1f5f9 100%)",
        }}
      >
        {/* Header Section */}
        <div className="text-center">
          <img
            src={
              user.profilePic
                ? `${import.meta.env.VITE_BACKEND_URL}${user.profilePic}`
                : "/avatar.jpeg"
            }
            alt="Profile"
            className="border shadow-sm"
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
          <h4 className="mt-3 mb-1 fw-bold text-primary">
            {user.name || "Unknown User"}
          </h4>
          <p className="text-muted mb-3" style={{ fontSize: "0.95rem" }}>
            {user.email || "No email available"}
          </p>
        </div>

        <hr className="my-3" />

        {/* Info Section */}
        <div className="row text-center text-md-start">
          <div className="col-md-6 col-12 ">
            <p className="mb-2">
              <strong> Bio:</strong> {user.bio || "Not set"}
            </p>
            <p className="mb-2">
              <strong> Location:</strong> {user.location || "Not set"}
            </p>
            <p>
              <strong> Phone:</strong> 9876543210
            </p>
          </div>

          <div className="col-md-6 col-12 mb-3">
            <p className="mb-2">
              <strong> YouTube:</strong>{" "}
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noreferrer"
                className="text-decoration-none text-primary"
              >
                youtube.com
              </a>
            </p>
            <p className="mb-2">
              <strong> Instagram:</strong>{" "}
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noreferrer"
                className="text-decoration-none text-primary"
              >
                instagram.com
              </a>
            </p>
          </div>
        </div>

        <hr className="my-3" />

        {/* Buttons */}
        <div className="d-flex justify-content-center">
          <Link to="/" className="btn btn-outline-primary rounded-pill px-4 py-2">
            ← Back to Feed
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
