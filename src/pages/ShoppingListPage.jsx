import { useState, useEffect, useCallback } from "react";
import { addItem, getItems, updateItem, deleteItem } from "../services/shoppingService";
import { useAuth } from "../hooks/UseAuth"; //  Assuming you have an AuthContext
import Spinner from "../components/Spinner";
import "../styles/shppingListPage.css"

function ShoppingListPage() {
  const { currentUser } = useAuth(); // Get logged-in user's info
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [loading, setLoading] = useState(true);

   // Function to load items
  const fetchItems = useCallback(async () => {
    if (!currentUser) {
    setLoading(false);
    return;
    }
    setLoading(true);
    const data = await getItems(currentUser.uid);
    setItems(data);
    setLoading(false);
  }, [currentUser])

 //  Fetch items from Firestore when the component mounts
  useEffect(() => {
    if (currentUser) {
      fetchItems();
    }
  },[currentUser, fetchItems]);

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
  if (loading) {
   return <Spinner />;

}
if (!items || items.length === 0) {
  return <p className="empty-message">Your list is empty</p>
}
   
  return (
    <div className="shopping-container">
      {loading ? (
        <Spinner /> 
      ) : (
        <>
            <h2>🛒 My Shopping List</h2>
        </>
      )     
    }
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
          <li key={item.id} className={item.completed  ? "completed" : ""}>
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
