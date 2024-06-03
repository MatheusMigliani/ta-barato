// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
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
  measurementId: "G-ZB2XBF5WM7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const db = getFirestore(app);

const auth = getAuth();
createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });




export { db, auth };