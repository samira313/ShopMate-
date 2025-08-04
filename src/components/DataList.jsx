import React, { useEffect, useState } from 'react';
import { deleteData, fetchData, updateData} from '../services/firebaseService';

export default function DataList() {
  // State to hold fetched data items
  const [data, setData] = useState([]);

  // useEffect runs once when the component mounts
  useEffect(() => {
    // Function to fetch data from Firebase
    const getData = async () => {
      const items = await fetchData(); // Retrieve data from database
      setData(items);                  // Update state with fetched items
    };
    getData(); // Call the function immediately
  }, []);

  // Function to delete a specific item by ID
  const handleDelete = async (id) => {
    await deleteData(id); // Remove item from Firebase
    setData(data.filter(item => item.id !== id)); // Update state by removing the deleted item
  };

  // Function to toggle the 'completed' status of an item
  const toggleComplete = async (id, currentStatus) => {
    try {
    setData(
      data.map((item) =>
        item.id === id 
          ? { ...item, completed: !item.completed } // Toggle the completed field
          : item                                   // Leave other items unchanged
      )
    );
    // Toggle the 'completed' status of a specific task by inverting its current value (true ⇄ false)
    await updateData(id, {completed: !currentStatus});
    console.log("Completion status updated in firebase")
} catch (error) {
    console.error("error toggling completion status", error);
}
  };

  return (
    <ul>
      {/* Map through the data array and display each item */}
      {data.map((item) => (
        <li
          key={item.id} // Unique key for React rendering optimization
          onClick={() => toggleComplete(item.id, item.completed)} // Toggle completion on list item click
          style={{
            // Apply strikethrough style if the item is marked as completed
            textDecoration: item.completed ? "line-through" : "none",
            cursor: "pointer" // Change cursor to pointer on hover
          }}
        >
          {/* Display the user and item name */}
          {item.user} - {item.name}
          {/* Delete button - stopPropagation prevents triggering the toggleComplete */}
          <button onClick={(e) => { e.stopPropagation(); handleDelete(item.id); }}>❌</button>
        </li>
      ))}
    </ul>
  );
}
