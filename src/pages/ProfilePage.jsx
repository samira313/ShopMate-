import React from 'react'
import { useAuth } from "../hooks/UseAuth";
import "../styles/ProfilePage.css"

export default function ProfilePage() {

    const  {currentUser}= useAuth();
    if (!currentUser) 
        return <p>Please log in to view your profile</p>
  return (
    <div className='profile-container'>
        <h2>Profile</h2>
        <p>Email: <strong> {currentUser.email}</strong></p>
        <p>User ID:<strong> {currentUser.uid}</strong> </p>
    </div>
  )
}
