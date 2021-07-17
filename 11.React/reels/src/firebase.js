import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage"
import "firebase/firestore"


firebase.initializeApp(
    {
        apiKey: "AIzaSyCO01Zu6N5ph4k8xoUvSxzILtNDqGUQFQM",
        authDomain: "reels-ae1a5.firebaseapp.com",
        projectId: "reels-ae1a5",
        storageBucket: "reels-ae1a5.appspot.com",
        messagingSenderId: "98970391379",
        appId: "1:98970391379:web:998a25db10a87a6c6347a6"
        }
)
export const auth = firebase.auth();
const firestore = firebase.firestore();

export const database = {
    users : firestore.collection("users"),
    getCurrentTimeStamp : firebase.firestore.FieldValue.serverTimestamp
}

export const storage = firebase.storage();

// export default firebase;