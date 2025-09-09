import {
  doc,
  getDoc,
  getDocs,
  updateDoc,
  onSnapshot,
  collection,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase-config";

// --- GET an item ---

export const getList = async (listName) => {
  try {
    const querySnapshot = await getDocs(collection(db, listName));
    const items = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return items;
  } catch (error) {
    console.error("Error fetching list:", error);
    return [];
  }
};
// --- Add a new item ---
export const addItem = async (userId, name) => {
  try {
    const newItem = {
      name,
      completed: false,
      userId,
      sharedWith: [], // start with empty array
      createdAt: Date.now(),
    };

    await addDoc(collection(db, "shoppingLists"), newItem);
  } catch (error) {
    console.error("Error adding item:", error);
  }
};

// --- Update item ---
export const updateItem = async (id, updatedFields) => {
  try {
    const itemRef = doc(db, "shoppingLists", id);
    await updateDoc(itemRef, updatedFields);
  } catch (error) {
    console.error("Error updating item:", error);
  }
};

// --- Delete item ---
export const deleteItem = async (id) => {
  try {
    const itemRef = doc(db, "shoppingLists", id);
    await deleteDoc(itemRef);
  } catch (error) {
    console.error("Error deleting item:", error);
  }
};

// --- Share item ---
export const handleShare = async (itemId, email) => {
  try {
    const itemRef = doc(db, "shoppingLists", itemId);
    const snapshot = await getDoc(itemRef);

    if (snapshot.exists()) {
      const item = snapshot.data();
      let sharedWith = item.sharedWith || [];

      if (!Array.isArray(sharedWith)) sharedWith = [];

      if (sharedWith.includes(email)) {
        return { success: false, message: `${email} already has access` };
      }

      await updateDoc(itemRef, {
        sharedWith: [...sharedWith, email],
      });

      return { success: true, message: `Shared with ${email}` };
    } else {
      return { success: false, message: "Item not found" };
    }
  } catch (error) {
    console.error("Error sharing item:", error);
    return { success: false, message: "Error while sharing" };
  }
};

// --- Subscribe to realtime updates ---
export const subscribeToItems = (callback) => {
  const collectionRef = collection(db, "shoppingLists");

  return onSnapshot(collectionRef, (snapshot) => {
    const items = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(items);
  });
};
