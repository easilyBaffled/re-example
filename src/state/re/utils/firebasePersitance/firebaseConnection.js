/**
 * Useful Docs
 * [Google Console](https://console.firebase.google.com/u/0/project/re-template/database/re-template-default-rtdb/data/~2F)
 *
 * [DataSnapshot | JavaScript SDK  |  Firebase](https://firebase.google.com/docs/reference/js/firebase.database.DataSnapshot?authuser=0)
 * [Set | JavaScript SDK  |  Firebase](https://firebase.google.com/docs/reference/js/firebase.database.Reference?authuser=0#set)
 * [Get | JavaScript SDK  |  Firebase](https://firebase.google.com/docs/reference/js/firebase.database.Reference?authuser=0#get)
 */
import firebase from "firebase/app";
import "firebase/database";
import { throttlePromise } from "../throttled-promise";

var firebaseConfig = {
    apiKey: "AIzaSyBR6bhmSfG6aBnk1TDOQyaPLQeIGlZxV1A",
    authDomain: "re-template.firebaseapp.com",
    projectId: "re-template",
    storageBucket: "re-template.appspot.com",
    messagingSenderId: "515961302597",
    appId: "1:515961302597:web:e7c0fe5bb4ba834340bd2c",
    databaseURL: "https://re-template-default-rtdb.firebaseio.com/"
};

export const initRealtimeFirebaseDB = () => {
    if (firebase.apps.length) firebase.app();
    else firebase.initializeApp(firebaseConfig);

    const dbRef = firebase.database().ref();

    const setFBValue = throttlePromise((v) =>
        dbRef.set(v).then(console.tap.label("set complete"))
    );

    return {
        getItem: () => dbRef.get().then((snapshot) => snapshot.val()),
        setItem: setFBValue,
        deleteItem: () => setFBValue()
    };
};
