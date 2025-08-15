import React from 'react'
import { useAuth } from "../hooks/UseAuth";
import "../styles/ProfilePage.css"
import { toast } from 'react-toastify';

export default function ProfilePage() {

    const  {currentUser}= useAuth();
    if (!currentUser) {
     toast.error("Please log in to view your profile");
    
    return null;
}
  return (
    <div className='profile-container'>
        <h2>Profile</h2>
        <p>Email: <strong> {currentUser.email}</strong></p>
        <p>User ID:<strong> {currentUser.uid}</strong> </p>
    </div>
  )
}
