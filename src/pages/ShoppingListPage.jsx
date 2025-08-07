import { useState, useEffect } from "react";
import { addItem, getItems, updateItem, deleteItem } from "../services/shoppingService";
import { useAuth } from "../hooks/UseAuth"; //  Assuming you have an AuthContext

function ShoppingListPage() {
  const { currentUser } = useAuth(); // Get logged-in user's info
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");

  //  Fetch items from Firestore when the component mounts
  useEffect(() => {
    if (currentUser) {
      fetchItems();
    }
  }, [currentUser]);

  // Function to load items
  const fetchItems = async () => {
    const data = await getItems(currentUser.uid);
    setItems(data);
  };

  //  Add new item
  const handleAddItem = async (e) => {
    e.preventDefault();
    if (newItem.trim() === "") return;

    await addItem(currentUser.uid, newItem);
    setNewItem("");
    fetchItems(); // reload list
  };

  // Toggle completed status
  const handleToggle = async (id, currentStatus) => {
    await updateItem(id, { completed: !currentStatus });
    fetchItems();
  };

  // Delete item
  const handleDelete = async (id) => {
    await deleteItem(id);
    fetchItems();
  };

  return (
    <div className="shopping-container">
      <h2>🛒 My Shopping List</h2>

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

      {/* Show list of items */}
      <ul>
        {items.map((item) => (
          <li key={item.id} style={{ textDecoration: item.completed ? "line-through" : "none" }}>
            {item.name}
            <button onClick={() => handleToggle(item.id, item.completed)}>✅</button>
            <button onClick={() => handleDelete(item.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ShoppingListPage;
