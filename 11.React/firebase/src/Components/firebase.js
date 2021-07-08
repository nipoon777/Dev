import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/firestore';

firebase.initializeApp(
    {
        apiKey: "AIzaSyDyC9K_EB_id3-YAG__qiJcAnTJNHCkdeE",
        authDomain: "class-demo-2895c.firebaseapp.com",
        projectId: "class-demo-2895c",
        storageBucket: "class-demo-2895c.appspot.com",
        messagingSenderId: "779244297011",
        appId: "1:779244297011:web:cdaca085837aeeed9b3c46"
      }
)
export default firebase;