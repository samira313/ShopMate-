import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/UseAuth";

// This component checks if the user is logged in before rendering the page
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  // If no user → redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If user is logged in → allow access
  return children;
};

export default ProtectedRoute;
