// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAQ7oESA-4t0pBvu33XZ0vpXhkpExVByKY",
  authDomain: "student-forum-f4186.firebaseapp.com",
  projectId: "student-forum-f4186",
  storageBucket: "student-forum-f4186.appspot.com",
  messagingSenderId: "652488305260",
  appId: "1:652488305260:web:113240fca3ac6064e20649",
  //measurementId: "G-68KLNN8JDH",
};

// Initialize Firebase
let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}
