import { initializeApp } from "firebase/app";
import "firebase/auth";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyALj66NqGsiM7V1Pzg_PoAjjjtqSeRVM2g",
  authDomain: "knowhowproject-669b3.firebaseapp.com",
  projectId: "knowhowproject-669b3",
  storageBucket: "knowhowproject-669b3.appspot.com",
  messagingSenderId: "105498110407",
  appId: "1:105498110407:web:b51cf015dd5affd2f251e2",
  measurementId: "G-H3GXRCQPS7",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
