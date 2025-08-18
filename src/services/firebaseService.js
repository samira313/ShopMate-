// Connect to Firestore database
 // Import Firebase config and Firestore functions
import { db } from '../firebase-config';
import { 
  collection, 
  addDoc,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
  serverTimestamp, 
  query, 
  where, 
  orderBy 
    }
     from 'firebase/firestore';


/**
 * Subscribe to items in Firestore in real-time
 * @param {string} userId - Current user's UID
 * @param {function} callback - Function to run when data changes
 * @returns {function} unsubscribe function
 */
export const subscribeToItems = (userId, callback) => {
  // Build query for user's shopping list
  const q = query(
    collection(db, "shoppingList"),
    where("userId", "==", userId),
    orderBy("createdAt", "desc")
  );

  // Listen to Firestore changes in real-time
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const items = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(items); // Send data back to component
  });

  return unsubscribe; // Component can stop listening when unmounted
};

/**
 * Add a new item to Firestore
 * @param {string} userId - Current user's UID
 * @param {string} name - Item name
 */
export const addItem = async (userId, name) => {
  if (!userId) return;
  if (!name.trim()) return; // Ignore empty input

  await addDoc(collection(db, "shoppingList"), {
    name,
    completed: false,
    userId,
    createdAt: serverTimestamp(), // For sorting
  });
};

/**
 * Update an item in Firestore
 * @param {string} id - Document ID
 * @param {object} updatedFields - Fields to update
 */
export const updateItem = async (id, updatedFields) => {
  try {
    const itemRef = doc(db, "shoppingList", id);
    await updateDoc(itemRef, updatedFields);
    console.log("Updated:", id);
  } catch (error) {
    console.error("Error updating item:", error);
  }
};

/**
 * Delete an item from Firestore
 * @param {string} id - Document ID
 */
export const deleteItem = async (id) => {
  try {
    await deleteDoc(doc(db, "shoppingList", id));
    console.log("Deleted:", id);
  } catch (error) {
    console.error("Error deleting item:", error);
  }
};
