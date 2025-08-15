import { useState, useEffect, useCallback } from "react";
import { addItem, getItems, updateItem, deleteItem } from "../services/shoppingService";
import { useAuth } from "../hooks/UseAuth"; //  Assuming you have an AuthContext
import Spinner from "../components/Spinner";
import "../styles/shppingListPage.css"
import { toast } from "react-toastify";

function ShoppingListPage() {
  const { currentUser } = useAuth(); // Get logged-in user's info
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

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
    if (!newItem.trim() || newItem.length === 0) {
         toast.error("Please enter an item name");
          return;   
    }

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

const filteredItems = items.filter((item) => {
    if (filter === "completed") return item.completed;
    if (filter === "pending") return !item.completed;
    return true;
  })


 return (
  <div className="shopping-container">
    {loading ? (
      <Spinner />
    ) : (
      <>
        <h2>🛒 My Shopping List</h2>
         <div className="filtered">
          <button onClick={() => setFilter("all")}>All</button>
          <button onClick={() => setFilter("completed")}>completed</button>
          <button onClick={() => setFilter("pending")}>pending</button>

         </div>

        {/* add items form*/}
        <form onSubmit={handleAddItem}>
          <input
            type="text"
            placeholder="Enter item..."
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
          />
          <button type="submit">Add</button>
        </form>

        {/* show empty message*/}
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
      </>
    )}
  </div>
);

}

export default ShoppingListPage;
