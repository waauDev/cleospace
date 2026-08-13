// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC7_DTjTFX9d9ZWIKqqQiIWMx2JdqMqfTo",
  authDomain: "cleospace-31a82.firebaseapp.com",
  projectId: "cleospace-31a82",
  storageBucket: "cleospace-31a82.firebasestorage.app",
  messagingSenderId: "901880609700",
  appId: "1:901880609700:web:d596ab1ed86a4c111cdf31",
  measurementId: "G-LPR6N3FW1C"
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig): getApp();


export const auth = getAuth(app);
export const db = getFirestore(app);