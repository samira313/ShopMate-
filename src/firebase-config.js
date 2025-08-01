// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDulHZccSypNZ1IH8iGCemhnJgU1Domfsk",
  authDomain: "shopmate-960cd.firebaseapp.com",
  projectId: "shopmate-960cd",
  storageBucket: "shopmate-960cd.firebasestorage.app",
  messagingSenderId: "37107611184",
  appId: "1:37107611184:web:e57961b1d9e87064f55ff5",
  measurementId: "G-D4VL7M2B8W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//Export app and db
export const db = getFirestore(app);
export default app;