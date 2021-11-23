import { initializeApp } from "firebase/app";
import {
  FacebookAuthProvider,
  getAuth,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCNmbn9Xw4egLKzqI2uDvFSYtu6TcIYMqQ",

  authDomain: "yt-clone-790d7.firebaseapp.com",

  projectId: "yt-clone-790d7",

  storageBucket: "yt-clone-790d7.appspot.com",

  messagingSenderId: "871815165080",

  appId: "1:871815165080:web:e92aac70ce01a0585e8ced",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);
const GoogleProvider = new GoogleAuthProvider();
const FacebookProvider = new FacebookAuthProvider();

export { app, db, auth, storage, FacebookProvider, GoogleProvider };
