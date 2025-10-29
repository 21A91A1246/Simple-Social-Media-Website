import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Signup from './components/Signup';
import Login from './components/Login';
import Feed from './components/Feed';
import CreatePost from './components/CreatePost';
import Dashboard from './components/Dashboard';
import UserProfile from './components/UserProfile';
import Footer from './components/Footer';

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem('user'));
    setUser(u);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <BrowserRouter>
      {/* ✅ Flex column layout makes footer behave correctly */}
      <div className="d-flex flex-column min-vh-100">
        <Navbar user={user} onLogout={handleLogout} />

        {/* ✅ This takes all available space between navbar and footer */}
        <main className="flex-grow-1">
          <div className="container mt-4">
            <Routes>
              <Route path="/" element={user ? <Feed /> : <Navigate to="/login" />} />
              <Route path="/create" element={user ? <CreatePost /> : <Navigate to="/login" />} />
              <Route path="/signup" element={<Signup onAuth={setUser} />} />
              <Route path="/login" element={<Login onAuth={setUser} />} />
              <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
              <Route path="userProfile/:id" element={<UserProfile /> } />
            </Routes>
          </div>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
