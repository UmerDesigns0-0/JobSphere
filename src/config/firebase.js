// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCelnesZBCffE0uu7POKp2_7vkwZCxVKqQ",
  authDomain: "jobs-9e8d0.firebaseapp.com",
  projectId: "jobs-9e8d0",
  storageBucket: "jobs-9e8d0.appspot.com",
  messagingSenderId: "256356211225",
  appId: "1:256356211225:web:15e18339e0f31e8ef62888",
  measurementId: "G-BN5T7G906N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getDatabase(app);

export { auth, provider };
export { db };