import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut, User } from "firebase/auth";
import app from "../firebase/clientApp";
import style from "../styles/main.module.css";
import { db } from "../firebase/clientApp";
import { doc, getDoc } from "firebase/firestore";
import SearchBar from "../components/searchBar";
import Item from "../components/item";

var currentUser: User | null;
var signedIn: boolean;
var name: string | null;

const auth = getAuth(app);

const Main: NextPage = (props) => {
  const { songs, albums, playlist }: any = props;
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
      <div className={style.navbar}>
        <p className={style.org}>Primal Tech</p>
        <div className={style.search__box}>
          <input className={style.search__input} />
          <button className={style.search__button}>search</button>
        </div>
      </div>
      <div className={style.song__section}>
        <div className={style.list}>
          <p className={style.list__name}>Top Tracks</p>
          <div className={style.items__container}>
            {/*Item component goes here*/}
          </div>
        </div>
        <div className={style.list}>
          <p className={style.list__name}>Top Albums</p>
          <div className={style.items__container}>
            {/*Item component goes here*/}
          </div>
        </div>
        <div className={style.list}>
          <p className={style.list__name}>My Playlist</p>
          <div className={style.items__container}>
            {/*Item component goes here*/}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
