import { getDatabase, ref, push, update, remove, onValue, off } from "firebase/database";
import app from "../firebase-config";

//  Initialize Realtime Database
const db = getDatabase(app);


// ADD a new shopping item
export const addItem = async (userId, name, sharedWith = []) => {
  try {
    if (!userId || !name.trim()) return;

    const newItemRef = push(ref(db, "shoppingLists"));
    await update(newItemRef, {
      userId,
      name,
      sharedWith, // array of emails
      completed: false,
      createdAt: Date.now(),
    });
  } catch (error) {
    console.error("Error adding item:", error);
  }
};

// UPDATE item

export const updateItem = async (id, updatedFields) => {
  try {
    const itemRef = ref(db, `shoppingLists/${id}`);
    await update(itemRef, {...updatedFields});
  } catch (error) {
    console.error("Error updating item:", error);
  }
};


// DELETE item

export const deleteItem = async (id) => {
  try {
    const itemRef = ref(db, `shoppingLists/${id}`);
    await remove(itemRef);
  } catch (error) {
    console.error("Error deleting item:", error);
  }
};


// SUBSCRIBE to realtime updates

export const subscribeToItems = (userEmail, callback) => {
  const itemsRef = ref(db, "shoppingLists");

  const listener = onValue(itemsRef, (snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val();

      const items = Object.entries(data).map(([id, item]) => ({
        id,
        ...item,
      }));

      // Filter only items owned by user OR shared with user
      const filtered = items.filter(
        (item) =>
          item.userId === userEmail ||
          (item.sharedWith && item.sharedWith.includes(userEmail))
      );

      callback(filtered);
    } else {
      callback([]);
    }
  });

  //  return cleanup function
  return () => off(itemsRef, "value", listener);
};