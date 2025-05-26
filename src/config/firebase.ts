// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyASCFtvmunmNkQIjq2FbxdJw1bqxOoC-fg",
  authDomain: "thygist-careerbox.firebaseapp.com",
  projectId: "thygist-careerbox",
  storageBucket: "thygist-careerbox.firebasestorage.app",
  messagingSenderId: "1020590426417",
  appId: "1:1020590426417:web:46308bc621b6e2cbd94810",
  measurementId: "G-E8GMNJEWRM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

