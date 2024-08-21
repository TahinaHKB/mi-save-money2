import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const config = {
  apiKey: "AIzaSyDz62b4waForoVPIvE3CdhYH2PIBqGjp2c",
  authDomain: "mi-savemoney.firebaseapp.com",
  databaseURL: "https://mi-savemoney-default-rtdb.firebaseio.com",
  projectId: "mi-savemoney",
  storageBucket: "mi-savemoney.appspot.com",
  messagingSenderId: "500799552810",
  appId: "1:500799552810:web:96a52720ed5833a313b253",
  measurementId: "G-6HGDGDYQFS",
};

// Initialize Firebase
const app = initializeApp(config);

export const auth = getAuth(app);
export const db = getDatabase(app);;
export default app;