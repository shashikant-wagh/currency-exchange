import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDS1QmJlX37Uelrt3Ph2yXzP8MBM3jboMY",
  authDomain: "currency-exchange-40522.firebaseapp.com",
  projectId: "currency-exchange-40522",
  storageBucket: "currency-exchange-40522.appspot.com",
  messagingSenderId: "707683097781",
  appId: "1:707683097781:web:732ba02167cbecb7cd72fc",
};

// eslint-disable-next-line no-unused-vars
const app = initializeApp(firebaseConfig);
export const db = getFirestore();
