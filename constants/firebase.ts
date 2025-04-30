import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
// Replace these with your actual Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAnKh-kwskqW5-eXnD3hA7Uc2N3rmnhgE4",
  authDomain: "pet-adoption-matcher.firebaseapp.com",
  projectId: "pet-adoption-matcher",
  storageBucket: "pet-adoption-matcher.firebasestorage.app",
  messagingSenderId: "1019885278848",
  appId: "1:1019885278848:web:5efa4fb194501b2ddbf865",
  measurementId: "G-XYCNSWK93C"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage }; 