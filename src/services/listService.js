import {
  doc,
  getDocs,
  updateDoc,
  deleteDoc,
  collection,
  query,
  addDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase-config";

/**
 * Add a new item
 */
export const addItem = async (userId, name) => {
  try {
    const newItem = {
      name: name || "shopping list",
      completed: false,
      userId: userId,
      sharedWith: [], // keep emails of users with access
      items: [],
      createdAt: Date.now(),
    };

    await addDoc(collection(db, "shoppingLists"), newItem);
  } catch (error) {
    console.error("Error adding item:", error);
  }
};

/**
 * Update an item (toggle completed or add fields)
 */
export const updateItem = async (id, updatedFields) => {
  try {
    const itemRef = doc(db, "shoppingLists", id);
    await updateDoc(itemRef, updatedFields);
  } catch (error) {
    console.error("Error updating item:", error);
  }
};

/**
 * Delete an item
 */
export const deleteItem = async (id) => {
  try {
    const itemRef = doc(db, "shoppingLists", id);
    await deleteDoc(itemRef);
  } catch (error) {
    console.error("Error deleting item:", error);
  }
};

/**
 * Share an item with another email
 */
export const handleShareList = async (userId, email) => {
  try {
    const q = query(collection(db, "shoppingLists"), `where("userId", "==", userId)`);
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return { success: false, message: "No items found for this user" };
    }

    querySnapshot.forEach(async (docSnap) => {
      const data = docSnap.data();
      const sharedWith = data.sharedWith || [];

      if (!sharedWith.includes(email)) {
        await updateDoc(docSnap.ref, {
          sharedWith: [...sharedWith, email],
        });
      }
    });

    return { success: true, message: `List shared with ${email}` };
  } catch (error) {
    console.error("Error sharing list:", error);
    return { success: false, message: "Error while sharing" };
  }
};

/**
 * Subscribe to Firestore in real-time
 */
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