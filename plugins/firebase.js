// import firebase from 'firebase'
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/analytics";

if (!firebase.apps.length) {
    firebase.initializeApp(
      {
        apiKey: "AIzaSyBYJuEewF5fu2L0OqFp7QzjUUDPs0mwblA",
        authDomain: "cotucotu-788dd.firebaseapp.com",
        projectId: "cotucotu-788dd",
        storageBucket: "cotucotu-788dd.appspot.com",
        messagingSenderId: "95257492842",
        appId: "1:95257492842:web:f55f4601d8384ea9d93913",
        measurementId: "G-M0HDCDS5XR"
      }
    );
  firebase.analytics();

  }
  
  export default firebase
