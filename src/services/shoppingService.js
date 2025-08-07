//Import required Firebase functions
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase-config"; // make sure db is exported from firebase-config.js

//  1. ADD a new shopping item to Firestore
export const addItem = async (userId, itemName) => {
  try {
    await addDoc(collection(db, "shoppingLists"), {
      userId,       // which user owns this item
      name: itemName,
      completed: false,  // initially not checked
      createdAt: new Date()
    });
  } catch (error) {
    console.error("Error adding item:", error);
  }
};

//  2. GET all items for a specific user
export const getItems = async (userId) => {
  try {
    const querySnapshot = await getDocs(collection(db, "shoppingLists"));
    // filter items that belong only to this user
    const items = querySnapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() }))
      .filter(item => item.userId === userId);
    return items;
  } catch (error) {
    console.error("Error fetching items:", error);
    return [];
  }
};

//  3. UPDATE item status or name
export const updateItem = async (id, updatedData) => {
  try {
    const itemRef = doc(db, "shoppingLists", id);
    await updateDoc(itemRef, updatedData);
  } catch (error) {
    console.error("Error updating item:", error);
  }
};

//  4. DELETE an item from Firestore
export const deleteItem = async (id) => {
  try {
    const itemRef = doc(db, "shoppingLists", id);
    await deleteDoc(itemRef);
  } catch (error) {
    console.error("Error deleting item:", error);
  }
};
