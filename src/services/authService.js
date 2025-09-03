// Import specific authentication functions from the Firebase Authentication library
// These functions help us create new users, log in existing users, log them out,
// and listen for authentication state changes.
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { setPersistence, browserLocalPersistence } from "firebase/auth";
// Import the 'auth' object (Firebase Authentication instance) from our firebase configuration file
import { auth } from "../firebase-config";

// Function to register a new user. It takes 'email' and 'password' as parameters
export const signup = async (email, password) => {
 // 'await' ensures that we wait for the response before returning it
  return await createUserWithEmailAndPassword(auth, email, password);
};

// Function to log in an existing user. It also takes 'email' and 'password' as parameters
export const login = async (email, password) => {
// If the credentials are valid, it logs the user in and returns user data
  return await signInWithEmailAndPassword(auth, email, password);
};

// Function to log out the current signed-in user
export const logout = async () => {
 // 'signOut' ends the current user's session
 // No parameters are needed because it logs out whoever is currently signed in
  return await signOut(auth);
};

// Function to listen for authentication state changes
// This is useful to know whether a user is logged in or logged out in real time
export const authListener = (callback) => {
// 'onAuthStateChanged' is a Firebase listener
// It runs every time the authentication state changes
// The callback receives a 'user' object if logged in, or 'null' if logged out
  onAuthStateChanged(auth, (user) => {
    
    callback(user);// Pass the user object (or null) to our callback function
  });
};

await setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("Auth persistence set to LOCAL");
  })
  .catch((error) => {
    console.error("Persistence error:", error);
  });