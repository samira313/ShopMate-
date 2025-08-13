// Connect to Firestore database
import { db, auth } from '../firebase-config';
import { 
  collection, 
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  serverTimestamp, 
  query, 
  where, 
  orderBy 
    }
     from 'firebase/firestore';
 // Import Firebase configuration

/**
 * This function gets all documents from the "test" collection
 */
    // Get all data from "test" collection
    // Return data as an array, including document ID
export const fetchData = async () => {
  const user = auth.currentUser;
  if (!user) return [];

  const q = query(
    collection(db, "shoppingList"),
    where("userId", "==", user.uid),
    orderBy("createdAt", "desc")

  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
// Add a new document to "shoppingList" collection
export const addData = async (name) => {
  const user = auth.currentUser; // get current user
  if (!user) return;
// if input is empty
  if (name.trim() !== "") return; 
  
    await addDoc(collection(db, "shoppingList"), {
       name,
       completed: false,
       userId: user.uid,
       createdAt: serverTimestamp(),
       });
  
};

/**
 * This function deletes a document from the "shoppingList" collection
 */
    // Find the document by ID
    // Delete the document
export const deleteData = async (id) => {
  await deleteDoc(doc(db, "shoppingList", id));
};

// This function updates data in firebase
export const updateData = async (id, updatedFields) => {
  try {
    const itemRef = doc(db, "shoppingList", id); //Find documents with id
    await updateDoc(itemRef, updatedFields);// update only new fields
    console.log("path",itemRef.path)
    console.log("data updated successfully");

  }catch (error) {
    console.error("erroe upadating data", error)

  }



}