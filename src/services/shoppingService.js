import React, { useEffect, useState } from "react";
import { addItem, updateItem, deleteItem, subscribeToItems } from "../services/firebaseService";

function ShoppingListPage({ user }) {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");

  // Listen to realtime updates
  useEffect(() => {
    if (!user?.email) return;

    const unsubscribe = subscribeToItems(user.email, setItems);

    return () => unsubscribe(); // cleanup when component unmounts
  }, [user]);

  // Add item
  const handleAdd = async () => {
    if (!newItem.trim()) return;
    await addItem(user.email, newItem, []); // sharedWith empty for now
    setNewItem("");
  };

  // Toggle completed
  const toggleComplete = async (id, completed) => {
    await updateItem(id, { completed });
  };

  // Delete item
  const handleDelete = async (id) => {
    await deleteItem(id);
  };

  return (
    <div>
      <h2>🛒 My Shopping List</h2>

      <input
        type="text"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        placeholder="Enter item..."
      />
      <button onClick={handleAdd}>Add</button>

      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <span
              style={{
                textDecoration: item.completed ? "line-through" : "none",
              }}
            >
              {item.name}
            </span>
            <button onClick={() => toggleComplete(item.id, !item.completed)}>
              {item.completed ? "Undo" : "Complete"}
            </button>
            <button onClick={() => handleDelete(item.id)}>❌ Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ShoppingListPage;