// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: "pet-quest-3d482.firebaseapp.com",
  projectId: "pet-quest-3d482",
  storageBucket: "pet-quest-3d482.appspot.com",
  messagingSenderId: "331346860571",
  appId: "1:331346860571:web:c324912f8fd6f0a00af6be",
  measurementId: "G-4KFDHFL6HE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const db = getFirestore(app);
