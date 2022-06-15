import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDmuyhw9HsP8MQMXec44UYMn80pRumnv0s",
  authDomain: "fb-crud-98bb2.firebaseapp.com",
  databaseURL: "https://fb-crud-98bb2.firebaseio.com",
  projectId: "fb-crud-98bb2",
  storageBucket: "fb-crud-98bb2.appspot.com",
  messagingSenderId: "84319002871",
  appId: "1:84319002871:web:996063e5767aa4df5f33f2",
};
// Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);

export const db = fb.firestore();
