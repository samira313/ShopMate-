import React, { useState, useEffect } from "react";
import {
  addItem,
  updateItem,
  deleteItem,
  handleShare,
  subscribeToItems,
} from "../services/listService";
import { useAuth } from "../hooks/UseAuth"; // Custom hook for auth
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import "../styles/ShoppingListPage.css"

function ShoppingListPage() {
  const { currentUser } = useAuth();
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [shareEmail, setShareEmail] = useState("");

  // --- Realtime Firestore subscription ---
  useEffect(() => {
    if (!currentUser) return;

    const unsubscribe = subscribeToItems((data) => {
      // Only show user's items or items shared with them
      const filtered = data.filter(
        (item) =>
          item.userId === currentUser.uid ||
          (Array.isArray(item.sharedWith) &&
            item.sharedWith.includes(currentUser.email))
      );
      setItems(filtered);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [currentUser]);

  // --- Add item ---
  const handleAddItem = async (e) => {
    e.preventDefault();
    if (!newItem.trim()) {
      toast.error("Please enter an item name");
      return;
    }
    await addItem(currentUser.uid, newItem);
    setNewItem("");
  };

  // --- Toggle complete ---
  const handleToggle = async (id, currentStatus) => {
    await updateItem(id, { completed: !currentStatus });
  };

  // --- Delete ---
  const handleDeleteClick = async (id) => {
    await deleteItem(id);
  };

  // --- Share ---
  const handleShareClick = async (itemId, email) => {
    if (!email.trim()) return;

    const result = await handleShare(itemId, email);
    if (result.success) {
      toast.success(result.message);
      setShareEmail("");
    } else {
      toast.error(result.message);
    }
  };

  // --- Filter items ---
  const filteredItems = items.filter((item) => {
    if (filter === "completed") return item.completed;
    if (filter === "pending") return !item.completed;
    return true;
  });

  if (loading) return <Spinner />;

  return (
    <div className="shopping-list-container">
      <h2>🛒 My Shopping List</h2>

      {/* Filter buttons */}
      <div className="filter-tabs">
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
        <button onClick={() => setFilter("pending")}>Pending</button>
      </div>

      {/* Add new item */}
      <form className="add-form" onSubmit={handleAddItem}>
        <input
          type="text"
          placeholder="Enter item..."
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      {/* Share input */}
      <input
        type="email"
        placeholder="Enter email to share with"
        value={shareEmail}
        onChange={(e) => setShareEmail(e.target.value)}
      />

      {/* Items list */}
      {filteredItems.length === 0 ? (
        <p>Your shopping list is empty!</p>
      ) : (
        <ul className="shopping-list">
          {filteredItems.map((item) => (
            <li key={item.id} className={item.completed ? "completed" : ""}>
              <span>{item.name}</span>
              <div className="actions">
                <button onClick={() => handleToggle(item.id, item.completed)}>
                  ✔
                </button>
                <button onClick={() => handleDeleteClick(item.id)}>❌</button>
                <button
                  onClick={() => handleShareClick(item.id, shareEmail)}
                >
                  Share
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ShoppingListPage;
