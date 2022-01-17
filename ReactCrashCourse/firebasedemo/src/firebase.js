// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCRu6NRmGi2jHwaygJakmd-moINIpvAfjY",
  authDomain: "fir-demo-16ba4.firebaseapp.com",
  projectId: "fir-demo-16ba4",
  storageBucket: "fir-demo-16ba4.appspot.com",
  messagingSenderId: "471026579433",
  appId: "1:471026579433:web:7bde2add45147b10e33d78"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth =  firebase.auth();

const firestore = firebase.firestore();

export const database = {
    users : firestore.collection('users')
}

export const storage = firebase.storage();