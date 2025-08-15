import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup  } from "../services/authService";
import "../styles/FormStyles.css"; // Import shared styles
import { toast } from "react-toastify";

const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password.length < 6){
      toast.error("Password must be at least 6 characters long");
      return;
    }
    setMessage("");
    setError("");
    try {
      await signup(email, password);
     toast.success("🎉 Account created successfully! Redirecting...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      toast.error("⚠️ Signup failed. Try again with a different email.", err);
    }
  };

  return (
    <div className="form-container">
      <h2>Create Account</h2>
      {error && <div className="alert alert-error">{error}</div>}
      {message && <div className="alert alert-success">{message}</div>}
      <form onSubmit={handleSignup} className="form-box">
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
          placeholder="Create a password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
          required
        />

        <button type="submit" className="btn-primary">Sign Up</button>
      </form>
    </div>
  );
};

export default SignupForm;
