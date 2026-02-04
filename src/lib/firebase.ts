// src/lib/firebase.ts

import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// আপনার index.html থেকে নেওয়া কনফিগারেশন
const firebaseConfig = {
  apiKey: "AIzaSyC5hrI06t9N-K4GAlLxGc6pjb0-JyNC9c8",
  authDomain: "myquizapp-7c5ac.firebaseapp.com",
  projectId: "myquizapp-7c5ac",
  storageBucket: "myquizapp-7c5ac.firebasestorage.app",
  messagingSenderId: "685862319630",
  appId: "1:685862319630:web:2997eda6844b3bf9d6ee5f"
};

// অ্যাপ ইনিশিয়ালাইজেশন (যাতে বারবার লোড না হয়)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// সার্ভিস এক্সপোর্ট
export const db = getFirestore(app);
export const auth = getAuth(app);
