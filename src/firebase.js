// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB6yhD7nb2dsDpVbq_agqU5zU3Ks8MJRKU",
  authDomain: "fir-project1-fe115.firebaseapp.com",
  projectId: "fir-project1-fe115",
  storageBucket: "fir-project1-fe115.appspot.com",
  messagingSenderId: "1091312473125",
  appId: "1:1091312473125:web:e802cd80a68d979d37dbcc"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
