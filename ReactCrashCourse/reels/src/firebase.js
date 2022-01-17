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
    apiKey: "AIzaSyCEvobW_xV-YVtUbVFsQ0EOl1ip3crGZfs",
    authDomain: "reels-b1830.firebaseapp.com",
    projectId: "reels-b1830",
    storageBucket: "reels-b1830.appspot.com",
    messagingSenderId: "908068527214",
    appId: "1:908068527214:web:58bae2defe090c91781a7f"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth =  firebase.auth();

const firestore = firebase.firestore();

export const database = {
    users : firestore.collection('users'),
    posts : firestore.collection('posts'),
    getTimeStamp : firebase.firestore.FieldValue.serverTimestamp
}

export const storage = firebase.storage();