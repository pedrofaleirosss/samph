import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBlL0_fXBV7Y6yCa4_2toUYUQSWKYM3MjA",
  authDomain: "samph-60cc6.firebaseapp.com",
  projectId: "samph-60cc6",
  storageBucket: "samph-60cc6.appspot.com",
  messagingSenderId: "814514170895",
  appId: "1:814514170895:web:ab7970044c9c5558df077a",
  measurementId: "G-0MHMQY7XL4",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
