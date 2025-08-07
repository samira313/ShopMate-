import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/UseAuth";

// This component checks if the user is logged in before rendering the page
const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if(loading) {
    return <p>Loading...</p>
  }

  // If no user → redirect to login
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // If user is logged in → allow access
  return children;
};

export default ProtectedRoute;
