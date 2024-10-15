import { getDoc, setDoc, updateDoc, doc } from "firebase/firestore";
import { db } from './../config/FirebaseConfig';

// Get the favorite list
export const GetFavList = async (user) => {
  const docSnap = await getDoc(doc(db, 'Favorite', user?.primaryEmailAddress?.emailAddress));
  if (docSnap?.exists()) {
    return docSnap.data();
  } else {
    await setDoc(doc(db, 'Favorite', user?.primaryEmailAddress?.emailAddress), {
      email: user?.primaryEmailAddress?.emailAddress,
      favorites: [],
    });
    return { favorites: [] }; // Return empty favorites
  }
};

// Update the favorite list
export const UpdateFav = async (user, favorites) => {
  const docRef = doc(db, 'Favorite', user?.primaryEmailAddress?.emailAddress);
  try {
    await updateDoc(docRef, { favorites: favorites });
  } catch (e) {
    console.error("Error updating document: ", e);
  }
};
