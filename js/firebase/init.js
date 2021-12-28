// Import the functions you need from the SDKs you need

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC1E1NCM7a5QN5GBgJ-iVI8cmp72mdE7mI",
  authDomain: "cordova-game-icy-tower.firebaseapp.com",
  projectId: "cordova-game-icy-tower",
  storageBucket: "cordova-game-icy-tower.appspot.com",
  messagingSenderId: "429147279518",
  appId: "1:429147279518:web:7f3696c5472d2f44216b8f",
  measurementId: "G-5YJVHV14QC"
};

// Initialize Firebase
export const appFb = initializeApp(firebaseConfig);
console.log(appFb);