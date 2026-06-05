import app from "firebase/app";
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCNpEd-Ge5PkSCFlk435AVRFyLU1Cyfdp0",
  authDomain: "pi-rn-sinagra-maffi-nucete.firebaseapp.com",
  projectId: "pi-rn-sinagra-maffi-nucete",
  storageBucket: "pi-rn-sinagra-maffi-nucete.firebasestorage.app",
  messagingSenderId: "968126612976",
  appId: "1:968126612976:web:55904a4784aa789a44c935"
};

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = app.firestore();