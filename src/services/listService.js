import { ref, get, child } from "firebase/database";
import  {db}  from "../firebase-config";


// Add a list
export async function getList(listId) {
  const dbRef = ref(db);
  try {
    const snapshot = await get(child(dbRef, `shoppingList/${listId}`));
    if(snapshot.exists()) {
      return snapshot.val();
    }else {
      console.log("No data available");
      return null;
    }
  }catch (error) {
    console.log(error);
  }
}