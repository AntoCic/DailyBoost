// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD-_R9SfbAsbz9HC7yRsa8SEizR6motYrg",
    authDomain: "dailyboostantocic.firebaseapp.com",
    databaseURL: "https://dailyboostantocic-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "dailyboostantocic",
    storageBucket: "dailyboostantocic.appspot.com",
    messagingSenderId: "190314985388",
    appId: "1:190314985388:web:56086d26d22f3f27026c09"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;