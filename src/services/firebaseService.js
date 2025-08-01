// Connect to Firestore database
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";
import app from "../firebase-config"; // Import Firebase configuration

// Create a connection to the database
const db = getFirestore(app);

/**
 * This function gets all documents from the "test" collection
 */
export async function fetchData() {
    // Get all data from "test" collection
    const querySnapshot = await getDocs(collection(db, "test"));
    // Return data as an array, including document ID
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

/**
 * This function adds a new document to the "test" collection
 * @param {string} name - The name you want to save
 */
export async function addData(name) {
    // Add a new document to "test" collection
    return await addDoc(collection(db, "test"), {
        users: "A",                    // Default value for 'users'
        name: name || "default name",  // If name is empty, use "default name"
    });
}

/**
 * This function deletes a document from the "shoppingList" collection
 * @param {string} id - The ID of the document to delete
 */
export const deleteData = async (id) => {
    // Find the document by ID
    const itemDoc = doc(db, "shoppingList", id);
    // Delete the document
    await deleteDoc(itemDoc);
};
