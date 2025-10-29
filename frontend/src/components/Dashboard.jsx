import React, { useEffect, useState } from "react";
import LikedPosts from "./LikedPosts";
import MyPosts from "./MyPosts";
import  api  from "../api"; // ✅ use centralized axios instance
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const Dashboard = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    bio: "",
    location: "",
    profilePic: "",
  });
  const [editing, setEditing] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState("");

  // ✅ Fetch logged-in user's profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/user/profile");
        console.log("Profile data from backend:", res.data);
        setProfile(res.data);
      } catch (err) {
        console.error("Error fetching profile:", err);
        if (err.response?.status === 401) {
          alert("Unauthorized. Please log in again.");
          localStorage.removeItem("token");
          window.location.href = "/login";
        }
      }
    };
    fetchProfile();
  }, []);

  // ✅ Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // ✅ Handle text input change
  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  // ✅ Save updated profile
  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("bio", profile.bio);
      formData.append("location", profile.location);
      if (selectedFile) formData.append("profilePic", selectedFile);

      const res = await api.put("/user/profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setProfile(res.data);
      setEditing(false);
      setSelectedFile(null);
      setPreview("");
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Failed to update profile. Try again.");
    }
  };

  // ✅ Build image URL
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const imageURL = preview
    ? preview
    : profile.profilePic
    ? `${backendURL}${profile.profilePic}`
    : "https://via.placeholder.com/100";

  return (
    <div className="container mt-4 mb-5">
      <h2 className="text-center fw-bold mb-4 text-primary">User Dashboard</h2>

      {/* 🔹 Profile Section */}
      <div className="card shadow-sm p-3 mb-5 border-0 rounded-4">
        <h4 className="text-secondary mb-3">Profile Information</h4>

        <div className="d-flex align-items-center mb-3">
          <img
            src={imageURL}
            alt="Profile"
            className="rounded-circle me-3 border border-2 border-light shadow-sm"
            style={{ width: "100px", height: "100px", objectFit: "cover" }}
          />
          <div>
            <p className="mb-1">
              <strong>Name:</strong> {profile.name || "Not available"}
            </p>
            <p className="mb-1">
              <strong>Email:</strong> {profile.email || "Not available"}
            </p>
          </div>
        </div>

        {editing ? (
          <>
            <textarea
              className="form-control mb-2"
              name="bio"
              value={profile.bio}
              onChange={handleChange}
              placeholder="Enter your bio"
            />
            <input
              type="text"
              className="form-control mb-2"
              name="location"
              value={profile.location}
              onChange={handleChange}
              placeholder="Enter your location"
            />
            <input
              type="file"
              className="form-control mb-3"
              accept="image/*"
              onChange={handleFileChange}
            />
            <button className="btn btn-success me-2" onClick={handleSave}>
              Save
            </button>
            <button
              className="btn btn-outline-secondary mt-2"
              onClick={() => setEditing(false)}
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <div className="container mt-3">
              <div className="row">
                <div className="col-md-6 col-12 mb-1">
                  <p>
                    <strong>Bio:</strong> {profile.bio || "Not set"}
                  </p>
                  <p>
                    <strong>Location:</strong> {profile.location || "Not set"}
                  </p>
                  <p>
                    <strong>Phone Number:</strong> 9876543210
                  </p>
                </div>
                <div className="col-md-6 col-12 mb-1">
                  <p>
                    <strong>Youtube:</strong> www.youtube.com
                  </p>
                  <p>
                    <strong>Social Media:</strong> www.instagram.com
                  </p>
                </div>
              </div>
            </div>

            <button
              className="btn btn-primary mt-2"
              onClick={() => setEditing(true)}
            >
              Edit Profile
            </button>
          </>
        )}
      </div>

      {/* 🔹 Accordion Section */}
      <div className="accordion shadow-sm rounded-4 border-0" id="postsAccordion">
        {/* Liked Posts */}
        <div className="accordion-item border-0 mb-3">
          <h2 className="accordion-header" id="headingLiked">
            <button
              className="accordion-button fw-semibold text-dark bg-light"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseLiked"
              aria-expanded="true"
              aria-controls="collapseLiked"
              style={{ backgroundColor: "#f8f9fa", borderRadius: "12px" }}
            >
              Liked Posts
            </button>
          </h2>
          <div
            id="collapseLiked"
            className="accordion-collapse collapse show"
            aria-labelledby="headingLiked"
            data-bs-parent="#postsAccordion"
          >
            <div className="accordion-body bg-white rounded-bottom-4 border-top">
              <LikedPosts />
            </div>
          </div>
        </div>

        {/* My Posts */}
        <div className="accordion-item border-0 mb-3">
          <h2 className="accordion-header" id="headingMyPosts">
            <button
              className="accordion-button collapsed fw-semibold text-dark bg-light"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseMyPosts"
              aria-expanded="false"
              aria-controls="collapseMyPosts"
              style={{ backgroundColor: "#f8f9fa", borderRadius: "12px" }}
            >
              My Posts
            </button>
          </h2>
          <div
            id="collapseMyPosts"
            className="accordion-collapse collapse"
            aria-labelledby="headingMyPosts"
            data-bs-parent="#postsAccordion"
          >
            <div className="accordion-body bg-white rounded-bottom-4 border-top">
              <MyPosts />
            </div>
          </div>
        </div>
      </div>

      {/* Small style enhancements */}
      <style>{`
        .accordion-button:hover {
          background-color: #e9ecef !important;
          transition: all 0.2s ease-in-out;
        }
        .accordion-button:focus {
          box-shadow: none;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
