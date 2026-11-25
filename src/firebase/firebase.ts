import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAI1ifEC5JMPlypr7X6zoX6OCBVs5iLBZ4",
  authDomain: "superstoreproyecto3.firebaseapp.com",
  databaseURL: "https://superstoreproyecto3-default-rtdb.firebaseio.com",
  projectId: "superstoreproyecto3",
  storageBucket: "superstoreproyecto3.firebasestorage.app",
  messagingSenderId: "810542991273",
  appId: "1:810542991273:web:01bae60a81b3cfe34ce6b8",
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);