import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyB90sheZ8i6IBATZseJ4TH3LiZgoUao-kc",
  authDomain: "practice-882dc.firebaseapp.com",
  projectId: "practice-882dc",
  storageBucket: "practice-882dc.firebasestorage.app",
  messagingSenderId: "249340791149",
  appId: "1:249340791149:web:b30940ef522ece1a6df264",
  measurementId: "G-2BRGF5XV0H"
};;


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);

export { app, auth, storage, db };
