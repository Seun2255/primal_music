import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc, addDoc, getDoc } from "firebase/firestore";

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

      setDoc(doc(db, "users", email), {
        name: username,
        email: email,
      });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      alert("sign up failed, please try again");
    });
};

export const loginUser = async (email: string, password: string) => {
  const auth = getAuth(app);
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert("Login failed, please try again");
    });
};

export const addToPlaylist = async (email: any, tracks: []) => {
  setDoc(doc(db, "playlists", email), {
    tracks: tracks,
  })
    .then(() => console.log("playlist added"))
    .catch(() => console.log("Failed"));
};

export const getPlayList = async (email: any) => {
  const data = await getDoc(doc(db, "playlists", email));
  if (data.exists()) {
    return data.data();
  } else {
    return [];
  }
};

export const getUser = async (email: any) => {
  const docRef = doc(db, "users", email);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return null;
  }
};

export default app;
