import type { NextPage } from "next";
import React from "react";
import { useState } from "react";
import { loginUser } from "../firebase/clientApp";
import style from "../styles/login&signup.module.css";

const login: NextPage = (props) => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  return (
    <div className={style.outer}>
      <p className={style.header}>Login</p>
      <div className={style.container}>
        <div className={style.item}>
          <p className={style.item__name}>Email</p>
          <input
            className={style.item__input}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div className={style.item}>
          <p className={style.item__name}>Password</p>
          <input
            className={style.item__input}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <button
          type="button"
          className={style.button}
          onClick={() => loginUser(email, password)}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default login;
