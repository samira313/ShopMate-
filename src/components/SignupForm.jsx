import { useState } from "react";
import { signup } from "../services/authService";

export default function SignupForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
     
    const handleSignup = async () => {
        try {
            await signup(email, password);
            setMessage("Singup successful!")
            console.log("user signed up successfully");

        }catch(error) {
            setMessage(error.massage);
            console.error(error.message)
        }
    }
  return (
    <div>
        <form>
            <input type='text' 
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required />
            <input type='password'
            placeholder="Enter password"
            value={password}
            onChange={(e) => {setPassword(e.target.value)}}
            autoComplete="new_password"
            required />
             <button type="button" onClick={handleSignup}>signup</button>
             
        </form>
        {message && <p>{message}</p>}
             
    </div>

  )
}
