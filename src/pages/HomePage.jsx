import React from "react";
import { Link } from "react-router-dom";
import "../styles/HomePage.css";

export default function HomePage() {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>ShopMate 🛒</h1>
        <p>Your smart shopping assistant</p>
      </header>

      <main className="home-main">
        <div className="home-card">
          <h2>Organize your shopping list easily</h2>
          <p>Stay on top of your groceries and never miss an item again!</p>

          <div className="home-buttons">
            <Link to="/login">
              <button className="btn btn-login">Login</button>
            </Link>
            <Link to="/signup">
              <button className="btn btn-signup">Sign Up</button>
            </Link>
          </div>
        </div>
      </main>

      <footer className="home-footer">
        <p>© {new Date().getFullYear()} ShopMate. All rights reserved.</p>
      </footer>
    </div>
  );
}
