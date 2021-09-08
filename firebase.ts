import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBypE1M4QK0zZfLHZWx6ksy7w8QajcX9d8",
    authDomain: "whatsup-3741e.firebaseapp.com",
    projectId: "whatsup-3741e",
    storageBucket: "whatsup-3741e.appspot.com",
    messagingSenderId: "854626123242",
    appId: "1:854626123242:web:70661f6da3c39d8ca80693",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore();

const auth = getAuth();
auth.languageCode = "ru";
const provider = new GoogleAuthProvider();

export { db, auth, provider, app };
