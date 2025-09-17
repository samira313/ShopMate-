import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence
} from "firebase/auth";

import { auth } from "../firebase-config";

// ✅ Init persistence (i called this once in main.jsx)
export const initAuthPersistence = async () => {
  try {
    await setPersistence(auth, browserLocalPersistence);
    console.log("✅ Auth persistence set to LOCAL");
  } catch (error) {
    console.error("❌ Persistence error:", error);
  }
};

// ✅ Signup new user
export const signup = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("✅ User signed up:", userCredential.user.email);
    return userCredential.user;
  } catch (error) {
    console.error("❌ Signup error:", error.message);
    throw error;
  }
};

// ✅ Login existing user
export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("✅ User logged in:", userCredential.user.email);
    return userCredential.user;
  } catch (error) {
    console.error("❌ Login error:", error.message);
    throw error;
  }
};

// ✅ Logout
export const logout = async () => {
  try {
    await signOut(auth);
    console.log("✅ User logged out");
  } catch (error) {
    console.error("❌ Logout error:", error.message);
  }
};

// ✅ Auth state listener
export const authListener = (callback) => {
  return onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("🔑 Current user:", user.email);
    } else {
      console.log("🚪 Not logged in");
    }
    callback(user);
  });
};