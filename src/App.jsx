import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import ProtectedRoute from "./routes/ProtectedRoute";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import ShoppingListPage from "./pages/ShoppingListPage";
import { useAuth } from "./hooks/UseAuth";
import Navbar from "./components/Navbar"; 
import ProfilePage from "./pages/ProfilePage";
import { ToastContainer } from "react-toastify";
import HomePage from "./pages/HomePage"
// import 'react-toastify/'
function App() {
   const { currentUser } = useAuth() || {};
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/home" element={<HomePage />} /> 
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Protected route: Only logged-in users can access */}
          <Route
            path="/shopping-list"
            element={
              <ProtectedRoute>
                <ShoppingListPage />
              </ProtectedRoute>
            }
          />
                  {/* Redirect to shopping list if logged in, else to login */}
        <Route
          path="/"
          element={currentUser ? <Navigate to="/shopping-list" /> : <Navigate to="/login" />}
        />
      <Route 
      path="/profile"
      element={
      <ProtectedRoute>
        <ProfilePage />
      </ProtectedRoute>
      } 
      />
        </Routes>
      </Router>
       <ToastContainer position="top-right" autoClose={3000} />
    </AuthProvider>
  );
}

export default App;
