// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDz613_esCJ75piCGDqj4xzIS9RwHW9npk",
  authDomain: "trip-planner-19d9b.firebaseapp.com",
  projectId: "trip-planner-19d9b",
  storageBucket: "trip-planner-19d9b.firebasestorage.app",
  messagingSenderId: "1022990082220",
  appId: "1:1022990082220:web:8c387f43797e4da8723f09",
  measurementId: "G-13LH0L9KK2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// const analytics = getAnalytics(app);