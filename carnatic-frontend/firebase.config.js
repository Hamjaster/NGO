// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBswsYD9AfRHu11VP5wjf83Er9VuMZ_Ns4",
    authDomain: "carnatic-ngo.firebaseapp.com",
    projectId: "carnatic-ngo",
    storageBucket: "carnatic-ngo.appspot.com",
    messagingSenderId: "952435075524",
    appId: "1:952435075524:web:b3ee4f8e3c47937609dc91"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
