// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyALK1wV5Diq_c6lMscaSUztUhThwI5Bd34",
  authDomain: "pruebavue-tamara.firebaseapp.com",
  projectId: "pruebavue-tamara",
  storageBucket: "pruebavue-tamara.firebasestorage.app",
  messagingSenderId: "859999389111",
  appId: "1:859999389111:web:2c156a60e925124c401432",
  measurementId: "G-DGZN59E45K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

export {db}
