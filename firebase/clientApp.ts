import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAo1lwHYJ1SZoLMPq5j6kFjQ9KjBO2bf6s",
  authDomain: "primal-music-c0d8e.firebaseapp.com",
  projectId: "primal-music-c0d8e",
  storageBucket: "primal-music-c0d8e.appspot.com",
  messagingSenderId: "828462120410",
  appId: "1:828462120410:web:1f4bf92ab0c202a7f894e3",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const addUser = async (
  email: string,
  password: string,
  username: string
) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user);
      setDoc(doc(db, "users", email), {
        name: username,
        email: email,
      })
        .then(() => console.log("user added"))
        .catch(() => console.log("Failed"));
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
};

export const loginUser = (email: string, password: string) => {
  const auth = getAuth(app);
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log("logged in");
      console.log(user);
      window.location.href = "http://localhost:3000/main";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("failed");
    });
};

export default app;
