// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCLIvhtDIm696h7glad6BVCqDJy6tjPAFQ",
  authDomain: "awesomecrafts-auth.firebaseapp.com",
  projectId: "awesomecrafts-auth",
  storageBucket: "awesomecrafts-auth.firebasestorage.app",
  messagingSenderId: "573298577389",
  appId: "1:573298577389:web:215b7fe674d24e3a2aa1e4",
  measurementId: "G-W4Z5M5GH97"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { app, auth };
