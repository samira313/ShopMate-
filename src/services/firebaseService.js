import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";
import  app  from "../firebase-config";

const db = getFirestore(app);

export async function fetchData() {
  const querySnapshot = await getDocs(collection(db, "test"));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function addData(name) {
  return await addDoc(collection(db, "test"), {
    user: "A",
    name: name || "default name"
  });
}
