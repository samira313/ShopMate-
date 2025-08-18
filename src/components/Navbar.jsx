import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa"; 
import { logout } from "../services/authService";
import { auth } from "../firebase-config";
import "../styles/Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const handleLogOut = async () => {
        try {
            await logout(auth);
            navigate("/login");

        }catch(error){
            console.error("Logout failed:", error)
        }
    }
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <FaShoppingCart className="logo-icon" />
        <span className="logo-text">ShopMate</span>
      </div>

      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li>
          <button className="logout-btn" onClick={handleLogOut}>Logout</button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
