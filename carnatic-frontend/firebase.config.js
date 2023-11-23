// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD8HzOtuPfBz1emqYIVSqivWShNlgSyT6o",
    authDomain: "next-project-20a19.firebaseapp.com",
    projectId: "next-project-20a19",
    storageBucket: "next-project-20a19.appspot.com",
    messagingSenderId: "429167109043",
    appId: "1:429167109043:web:19c4c9018ded44d689a1c6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
