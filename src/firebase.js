import { initializeApp } from "firebase/app";
import "firebase/auth";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { collection } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDsOvWG2hlM3XoPZ8D13kjvGNb-RMRGULw",
  authDomain: "knowhow-66569.firebaseapp.com",
  projectId: "knowhow-66569",
  storageBucket: "knowhow-66569.appspot.com",
  messagingSenderId: "68164043165",
  appId: "1:68164043165:web:7bbff75c051254bbfd2f74",
  measurementId: "G-7RYYLE7QLD",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export const colRef = collection(db, "projects");

export default app;
