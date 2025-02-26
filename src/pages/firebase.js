import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyBUUGWZ2QprdIy_towYSsfrOlu9sadyTjI",
    authDomain: "ignite-64aaa.firebaseapp.com",
    projectId: "ignite-64aaa",
    storageBucket: "ignite-64aaa.firebasestorage.app",
    messagingSenderId: "213515925472",
    appId: "1:213515925472:web:617d01c0e6e1f54c711d85",
    measurementId: "G-79NFRRLVRG"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);