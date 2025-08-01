import React, { useState } from 'react'
import { addData } from '../services/firebaseService';

export default function Form() {
    const [name, setName ] = useState("");

    const handleAdd = async () => {
     await addData(name);
     setName("");
    }
  return (
    <div>
        <input 
        type='text'
        value={name}
        placeholder=''
        onChange={(e) => setName(e.target.value)}
            />
            <button onClick={handleAdd}>Add Item</button>
      
    </div>
  )
}
