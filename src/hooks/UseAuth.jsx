import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

// Custom hook to use AuthContext anywhere
 export const useAuth = () => {
    return useContext(AuthContext);
 }