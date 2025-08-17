import React from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Welcome to ShopMate 🛒</h1>
      <p>Manage your shopping list easily and stay organized!</p>

      <div style={{ marginTop: "2rem" }}>
        <Link to="/login">
          <button style={{ padding: "10px 20px", marginRight: "1rem" }}>
            Login
          </button>
        </Link>
        <Link to="/signup">
          <button style={{ padding: "10px 20px" }}>
            Sign Up
          </button>
        </Link>
      </div>
    </div>
  );
}
