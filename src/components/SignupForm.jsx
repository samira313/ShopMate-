import React, { useState } from "react";
import { signup } from "../services/authService"; 

function SignupForm() {
  // States to manage form inputs, errors, and success messages
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // Handle signup form submission
  const handleSignup = async (e) => {
    e.preventDefault(); // Prevent page reload

    // Reset previous error/message before starting
    setError("");
    setMessage("");

    try {
      await signup(email, password);
      setMessage("✅ Signup successful! You can now log in.");
      setEmail("");
      setPassword("");
    } catch (err) {
      setError("❌ Signup failed: " + err.message);
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      {/* Display success message */}
      {message && <p style={{ color: "green" }}>{message}</p>}
      {/* Display error message */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Signup form */}
      <form onSubmit={handleSignup}>
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

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignupForm;
