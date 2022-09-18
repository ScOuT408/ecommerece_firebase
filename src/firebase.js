import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCwvz7phalggfSPDXwqcXNfFDbDL_y-zOE",
  authDomain: "fir-ecom-42c01.firebaseapp.com",
  projectId: "fir-ecom-42c01",
  storageBucket: "fir-ecom-42c01.appspot.com",
  messagingSenderId: "279411145138",
  appId: "1:279411145138:web:cbc2f2a5e92bcbf3330cab",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
