import React, { useState, useEffect } from "react";
import { addItem, updateItem, deleteItem, subscribeToItems } from "../services/firebaseService";
import { useAuth } from "../hooks/UseAuth"; 
import Spinner from "../components/Spinner";
import "../styles/ShoppingListPage.css";
import { toast } from "react-toastify";

function ShoppingListPage() {
  const { currentUser } = useAuth(); // Get logged-in user's info
  const [items, setItems] = useState([]); // shopping list
  const [newItem, setNewItem] = useState(""); // input field state
  const [loading, setLoading] = useState(true); // loading spinner
  const [filter, setFilter] = useState("all"); // all | completed | pending

  // Subscribe to Firestore in real-time
  useEffect(() => {
    if (!currentUser) return;

    // subscribeToItems will listen for changes in Firestore
    const unsubscribe = subscribeToItems(currentUser.uid, (data) => {
      setItems(data);
      setLoading(false);
    });

    // Cleanup subscription when component unmounts
    return () => unsubscribe();

  }, [currentUser]);

  // Add new item
  const handleAddItem = async (e) => {
    e.preventDefault();
    if (!newItem.trim()) {
      toast.error("Please enter an item name");
      return;
    }

    await addItem(currentUser.uid, newItem);
    setNewItem(""); // clear input field
    //remember: No need to manually reload (real-time handles it)
  };

  // Toggle completed status
  const handleToggle = async (id, currentStatus) => {
    await updateItem(id, { completed: !currentStatus });
   
  };

  // Delete item
  const handleDelete = async (id) => {
    await deleteItem(id);
   
  };

  // Filter items before displaying
  const filteredItems = items.filter((item) => {
    if (filter === "completed") return item.completed;
    if (filter === "pending") return !item.completed;
    return true;
  });

  if (loading) return <Spinner />;

  return (
    <div className="shopping-container">
      <h2>🛒 My Shopping List</h2>

      {/* Filter buttons */}
      <div className="filtered">
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
        <button onClick={() => setFilter("pending")}>Pending</button>
      </div>

      {/* Add new item form */}
      <form onSubmit={handleAddItem}>
        <input
          type="text"
          placeholder="Enter item..."
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      {/* Show list */}
      {items.length === 0 ? (
        <p className="empty-message">Your list is empty</p>
      ) : (
        <ul>
          {filteredItems.map((item) => (
            <li key={item.id} className={item.completed ? "completed" : ""}>
              {item.name}
              <button onClick={() => handleToggle(item.id, item.completed)}>✅</button>
              <button onClick={() => handleDelete(item.id)}>❌</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ShoppingListPage;
