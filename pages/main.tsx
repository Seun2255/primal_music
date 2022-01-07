import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut, User } from "firebase/auth";
import app from "../firebase/clientApp";
import style from "../styles/main.module.css";
import { db } from "../firebase/clientApp";
import { doc, getDoc } from "firebase/firestore";

var currentUser: User | null;
var signedIn: boolean;
var name: string | null;

const auth = getAuth(app);

const main: NextPage = (props) => {
  const [user, setUser]: any = useState("Person");
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("Logged in");
      currentUser = user;
      setUser(currentUser.email);
      signedIn = true;
    } else {
      console.log("Not logged in");
      signedIn = false;
    }
  });

  return (
    <div className={style.outer}>
      <p className={style.text}>Hello {user}</p>
      <button
        type="button"
        className={style.button}
        onClick={() =>
          signOut(auth).then(
            () => (window.location.href = "http://localhost:3000/login")
          )
        }
      >
        Log out
      </button>
    </div>
  );
};

export default main;
