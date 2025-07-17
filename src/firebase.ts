// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC0ybhaqHXKU-UzpfQK8hG3bd1k85Fh3DQ",
  authDomain: "eva42025ieimartin.firebaseapp.com",
  projectId: "eva42025ieimartin",
  storageBucket: "eva42025ieimartin.firebasestorage.app",
  messagingSenderId: "7823183709",
  appId: "1:7823183709:web:4a0a1a42971e640de162b4",
  measurementId: "G-VY4VG4TD84"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);