import { ref, get, child, update } from "firebase/database";
import  {db}  from "../firebase-config";


// Add a list
export async function getList(listId) {
  const dbRef = ref(db);
  try {
    const snapshot = await get(child(dbRef, `shoppingLists/${listId}`));
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
      const sharedWith = Array.isArray(item.sharedWith) ? item.sharedWith : [];

      if (sharedWith.includes(email)) {
        return { success: false, message: `${email} already has access`};
      }

      await update(itemRef, {
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