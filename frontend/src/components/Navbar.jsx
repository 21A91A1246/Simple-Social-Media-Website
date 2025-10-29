import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar({ user, onLogout }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm sticky-top">
      <div className="container">
        <Link className="navbar-brand fw-bold d-flex align-items-center" to="/">
          <img
            src="./logo.jpeg"
            alt="Logo"
            className="me-2"
            style={{ height: "50px", width: "40px", borderRadius: "50%",margin:'0px' }}
          />
          
        </Link>

        {/* Toggler for mobile view */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible content */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-lg-center">
            {user ? (
              <>
                <li className="nav-item me-lg-3 mt-2 mt-lg-0">
                  <span className="nav-link">Hi, <strong>{user.name}</strong></span>
                </li>
                <li className="nav-item me-lg-3 mt-2 mt-lg-0">
                  <Link className="nav-link" to="/Dashboard">Dashboard</Link>
                </li>
                <li className="nav-item me-lg-3">
                  <Link className="nav-link" to="/create">Create</Link>
                </li>
                <li className="nav-item">
                  <button className="btn btn-outline-secondary w-100 w-lg-auto" onClick={onLogout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item me-lg-2 mt-2 mt-lg-0">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">Signup</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
