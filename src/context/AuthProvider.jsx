import React, { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext"; 
import { authListener } from "../services/authService";


//Provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // store current user
  const [loading, setLoading] = useState(true); // to show loading while checking auth

  useEffect(() => {
    // Listen for authentication changes
    const unsubscribe = authListener((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    // Cleanup listener on component unmount
    return () => unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
