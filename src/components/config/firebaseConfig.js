import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {  
    apiKey: "AIzaSyApcc3ArqnoFjz9-xyAVBfYjUK1crvdA-Q",
    authDomain: "resumeuploaderstorage.firebaseapp.com",
    projectId: "resumeuploaderstorage",
    storageBucket: "resumeuploaderstorage.appspot.com",
    messagingSenderId: "626364308531",
    appId: "1:626364308531:web:e516d4069cc1af269bd746"};
// Firebase Api Key inputed into the bracket 

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const storage = getStorage(app);
