import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCPrKFCOzUacvgMf0roQBmopVyPJwze_B4",
  authDomain: "crud-758b3.firebaseapp.com",
  projectId: "crud-758b3",
  storageBucket: "crud-758b3.appspot.com",
  messagingSenderId: "845011600231",
  appId: "1:845011600231:web:1cb166339d378bcb4325c2",
  measurementId: "G-T6FERT3VEP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


export default db;