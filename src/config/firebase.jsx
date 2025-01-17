// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBjCr8fs8cuAtvmcZIoZiFQCF7yYKzjxt0",
  authDomain: "v-chat-1ffcc.firebaseapp.com",
  projectId: "v-chat-1ffcc",
  storageBucket: "v-chat-1ffcc.firebasestorage.app",
  messagingSenderId: "1068789952103",
  appId: "1:1068789952103:web:45abc568587a39a6002ec2",
  measurementId: "G-DDXCJ2EFB5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new  GoogleAuthProvider();