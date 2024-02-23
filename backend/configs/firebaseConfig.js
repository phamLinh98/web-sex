// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyALUJ5WWqeJdyIGWo-x-99DamDRpAxtAhk",
  authDomain: "linhthusinh98xxx.firebaseapp.com",
  projectId: "linhthusinh98xxx",
  storageBucket: "linhthusinh98xxx.appspot.com",
  messagingSenderId: "740160950348",
  appId: "1:740160950348:web:f6c37016b236276ea7e4e9",
  measurementId: "G-XH5BRS71EK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app);
