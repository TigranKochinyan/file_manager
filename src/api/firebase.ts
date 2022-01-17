import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite'; // collection, getDocs, setDoc, doc

const firebaseConfig = {
  apiKey: "AIzaSyD0Lz_42CFF1rohquTcssdhs5gGEdAEUsc",
  authDomain: "file-manager-4a88d.firebaseapp.com",
  projectId: "file-manager-4a88d",
  storageBucket: "file-manager-4a88d.appspot.com",
  messagingSenderId: "623064983830",
  appId: "1:623064983830:web:5e2722921676071a280837",
  measurementId: "G-V63V8DQB5K"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);