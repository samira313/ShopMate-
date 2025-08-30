import { ref, get, child, update } from "firebase/database";
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

export const handleShare = async (itemId, email) => {
  try {
    const itemRef = ref(db, `shoppingLists/${itemId}`);
    const snapshot = await get(itemRef);

    if (snapshot.exists()) {
      const item = snapshot.val();
      const sharedWith = item.sharedWith || [];

      if (!sharedWith.includes(email)) {
        await update(itemRef, {
          sharedWith: [...sharedWith, email],
        });
      }
    }
  } catch (error) {
    console.error("Error sharing item:", error);
  }
};
