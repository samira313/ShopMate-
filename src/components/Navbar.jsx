import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../services/authService";
import "../styles/Navbar.css"; 

export default function Navbar() {
  return (
    <nav className="navbar">
      <h1 className="navbar-title">ShopMate</h1>

      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/profile">Profile</Link>
        <button className="logout-btn" onClick={logout}>Logout</button>
      </div>
    </nav>
  );
}
