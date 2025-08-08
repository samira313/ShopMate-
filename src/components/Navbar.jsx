import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../services/authService";
import "../styles/Navbar.css"; 

export default function Navbar() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate("/login");

        }catch(error){
            console.error("Logout failed:", error)
        }
    }
  return (
    <nav className="navbar">
      <h1 className="navbar-title">ShopMate</h1>

      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/profile">Profile</Link>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
}
