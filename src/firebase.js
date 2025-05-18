import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence, EmailAuthProvider,updatePassword,reauthenticateWithCredential } from "firebase/auth";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBUUGWZ2QprdIy_towYSsfrOlu9sadyTjI",
  authDomain: "ignite-64aaa.firebaseapp.com",
  projectId: "ignite-64aaa",
  storageBucket: "ignite-64aaa.appspot.com", 
  messagingSenderId: "213515925472",
  appId: "1:213515925472:web:617d01c0e6e1f54c711d85",
  measurementId: "G-79NFRRLVRG"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Set persistence
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("Persistence set successfully");
  })
  .catch((error) => {
    console.error("Error setting persistence:", error);
  });

// Export all the necessary Firebase functions and instances
export { 
  auth, 
  db,
  EmailAuthProvider,
  updatePassword,
  reauthenticateWithCredential,
  doc, 
  getDoc, 
  updateDoc 
};

export default app;