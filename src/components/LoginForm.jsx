import React, { useState } from "react";
import { login } from "../services/authService";

function LoginForm() {
  // States for form inputs, error, and success messages
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // Handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent page reload

    // Reset previous error/message
    setError("");
    setMessage("");

    try {
      await login(email, password);
      setMessage("✅ Login successful! Welcome back.");
      setEmail("");
      setPassword("");
    } catch (err) {
      setError("❌ Login failed: " + err.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {/* Display success message */}
      {message && <p style={{ color: "green" }}>{message}</p>}
      {/* Display error message */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Login form */}
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />
        </div>

        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="password"
            required
          />
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginForm;
