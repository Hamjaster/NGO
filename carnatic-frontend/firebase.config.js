// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD7kBQaLI3N-H-qxS82PSGOO9y1gGN63uU",
    authDomain: "carnatic-foundation.firebaseapp.com",
    projectId: "carnatic-foundation",
    storageBucket: "carnatic-foundation.appspot.com",
    messagingSenderId: "1070551419292",
    appId: "1:1070551419292:web:79824598f045d27ed1e059"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
