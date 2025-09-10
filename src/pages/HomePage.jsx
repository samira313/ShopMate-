// src/pages/HomePage.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth }from "../hooks/UseAuth"; // Custom hook for authentication
import "../styles/HomePage.css";

export default function HomePage() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  // If the user is logged in → redirect to shopping list
  useEffect(() => {
    if (currentUser) {
      navigate("/shopping-list");
    }
  }, [currentUser, navigate]);

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>🛍 ShopMate</h1>
        <p>Your smart shopping assistant</p>
      </header>

      <main className="home-main">
        <div className="home-card">
          <h2>Organize your shopping list easily</h2>
          <p>Stay on top of your groceries and never miss an item again!</p>
        </div>

        <div className="home-buttons">
          <button
            className="btn btn-login"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
          <button
            className="btn btn-signup"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </button>
        </div>
      </main>

      <footer className="home-footer">
        <p>© {new Date().getFullYear()} ShopMate. All rights reserved.</p>
      </footer>
    </div>
  );
}
