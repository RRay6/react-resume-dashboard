import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

// const firebaseConfig = {
//     apiKey: "AIzaSyApcc3ArqnoFjz9-xyAVBfYjUK1crvdA-Q",
//     authDomain: "resumeuploaderstorage.firebaseapp.com",
//     projectId: "resumeuploaderstorage",
//     storageBucket: "resumeuploaderstorage.appspot.com",
//     messagingSenderId: "626364308531",
//     appId: "1:626364308531:web:e516d4069cc1af269bd746"};
// // Firebase Api Key inputed into the bracket

// const app = initializeApp(firebaseConfig);
// export const db = getDatabase(app);
// export const storage = getStorage(app);

// Import the functions you need from the SDKs you need

//import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyCGAikeANRvzH-0DGcF3LvKRH1yI1bZgcQ",
  authDomain: "resumeuploaderstorage-2b930.firebaseapp.com",
  databaseURL:
    "https://resumeuploaderstorage-2b930-default-rtdb.firebaseio.com",
  projectId: "resumeuploaderstorage-2b930",
  storageBucket: "resumeuploaderstorage-2b930.appspot.com",
  messagingSenderId: "529050626475",
  appId: "1:529050626475:web:1fd415d05d151056a38aee",
};

// Initialize Firebase

//const app = initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const storage = getStorage(app);
