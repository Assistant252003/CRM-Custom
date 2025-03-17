// Import Firebase functions
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database"; // ✅ Import Realtime Database
import { getAnalytics } from "firebase/analytics";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBH_yZ5LBpiQFDGs36f3YLr436kkGJ_koQ",
  authDomain: "lead-management-4431d.firebaseapp.com",
  databaseURL: "https://lead-management-4431d-default-rtdb.firebaseio.com",
  projectId: "lead-management-4431d",
  storageBucket: "lead-management-4431d.appspot.com", // ✅ Fixed typo here
  messagingSenderId: "968487848178",
  appId: "1:968487848178:web:c8f1874dd35bae00cb686b",
  measurementId: "G-R2QVZRH8BF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const database = getDatabase(app); // ✅ Export database
