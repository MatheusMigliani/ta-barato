// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBWZBEN6H13uXNgDCLWFhOlxjazOuwmA7o",
  authDomain: "tabarato-app.firebaseapp.com",
  projectId: "tabarato-app",
  storageBucket: "tabarato-app.appspot.com",
  messagingSenderId: "582524239690",
  appId: "1:582524239690:web:aa73ec2fef957a15540bb3",
  measurementId: "G-ZB2XBF5WM7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services

const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);

export { auth };
