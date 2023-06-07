// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfigDev = {
    apiKey: "AIzaSyCO7pJJ55mNmZBnl0JlslLydMJjwJMKKSM",
    authDomain: "mergerhive-7aeeb.firebaseapp.com",
    projectId: "mergerhive-7aeeb",
    storageBucket: "mergerhive-7aeeb.appspot.com",
    messagingSenderId: "1092930195154",
    appId: "1:1092930195154:web:b9d957c89a99b5aa5ba70b",
    measurementId: "G-WKWNNJNN5T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfigDev);
// Initialize Firebase Authentication and get a reference to the service
// Firebase storage reference
export const storage = getStorage(app);
export const auth = getAuth(app);