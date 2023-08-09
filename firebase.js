import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAgdIs7tAuxuhza4NVlX8h-MB3SMuG2lVk",
  authDomain: "clone-d1d9a.firebaseapp.com",
  projectId: "clone-d1d9a",
  storageBucket: "clone-d1d9a.appspot.com",
  messagingSenderId: "839824943249",
  appId: "1:839824943249:web:28d1615b193b61f054b730",
  measurementId: "G-ER77ZCY7GD"
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;