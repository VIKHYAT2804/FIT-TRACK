import React from "react";
import { getToken, clearToken } from "../auth/auth.js";

const Navbar = ({ onSignIn, onSignUp }) => {
  const token = getToken();

  const handleLogout = () => {
    clearToken();
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <div className="logo">FitTrack</div>

      <ul className="nav-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#features">Features</a></li>
        <li><a href="#testimonials">Testimonials</a></li>
        <li><a href="#about">About</a></li>
      </ul>

      <div className="nav-buttons">
        {!token ? (
          <>
            <button onClick={onSignIn} className="login-btn">Login</button>
            <button onClick={onSignUp} className="cta-btn">Sign Up</button>
          </>
        ) : (
          <>
            <button onClick={handleLogout} className="login-btn">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
