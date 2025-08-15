import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import "../styles/FormStyles.css"; // Import shared styles
import { toast } from "react-toastify";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Handle form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    try {
      await login(email, password);
      toast.success("✅ Login successful! Redirecting...");
      setTimeout(() => navigate("/shopping-list"), 1500);
    } catch (err) {
      toast.error("❌ Login failed. Please check your password or email", err);
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      {error && <div className="alert alert-error">{error}</div>}
      {message && <div className="alert alert-success">{message}</div>}
      <form onSubmit={handleLogin} className="form-box">
        <label>Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          required
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
        />

        <button type="submit" className="btn-primary">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
