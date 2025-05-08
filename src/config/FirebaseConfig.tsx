// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//@ts-ignore
import {  getReactNativePersistence, initializeAuth } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
// import {getAnalytics} from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBMFPQ1dVSgdf5my4ENNz3EH4DANnJJlhU",
  authDomain: "shopping-list-ebdbe.firebaseapp.com",
  databaseURL: "https://shopping-list-ebdbe-default-rtdb.firebaseio.com",
  projectId: "shopping-list-ebdbe",
  storageBucket: "shopping-list-ebdbe.firebasestorage.app",
  messagingSenderId: "1020925657484",
  appId: "1:1020925657484:web:a5e30276cab7097acf96a9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

// const analytics = getAnalytics(app);
