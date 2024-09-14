import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCb3xSD611K-JyBYWLgHlxaaGAGOV5c9Ds",
  authDomain: "login-1d5ca.firebaseapp.com",
  projectId: "login-1d5ca",
  storageBucket: "login-1d5ca.appspot.com",
  messagingSenderId: "575094168739",
  appId: "1:575094168739:web:19fd49ce2c598e580e3316",
  databaseURL: "https://login-1d5ca-default-rtdb.firebaseio.com"
};

export const app = initializeApp(firebaseConfig);