// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD0Lz_42CFF1rohquTcssdhs5gGEdAEUsc",
  authDomain: "file-manager-4a88d.firebaseapp.com",
  projectId: "file-manager-4a88d",
  storageBucket: "file-manager-4a88d.appspot.com",
  messagingSenderId: "623064983830",
  appId: "1:623064983830:web:5e2722921676071a280837",
  measurementId: "G-V63V8DQB5K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// import firebase from 'firebase';

// const {
//     REACT_APP_FIREBASE_API_KEY,
//     REACT_APP_AUTH_DOMAIN,
//     REACT_APP_DATABASE_URL,
//     REACT_APP_PROJECT_ID,
//     REACT_APP_STORAGE_BUCKET,
//     REACT_APP_MESSAGING_SENDER_ID,
//     REACT_APP_APP_ID,
//     REACT_APP_MEASUREMENT_ID,
// } = process.env;

// export const firebaseConfig = {
//     apiKey: REACT_APP_FIREBASE_API_KEY,
//     authDomain: REACT_APP_AUTH_DOMAIN,
//     databaseURL: REACT_APP_DATABASE_URL,
//     projectId: REACT_APP_PROJECT_ID,
//     storageBucket: REACT_APP_STORAGE_BUCKET,
//     messagingSenderId: REACT_APP_MESSAGING_SENDER_ID,
//     appId: REACT_APP_APP_ID,
//     measurementId: REACT_APP_MEASUREMENT_ID,
// };

// export const firebase_app = firebase.initializeApp(firebaseConfig);