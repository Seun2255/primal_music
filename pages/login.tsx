import type { NextPage } from "next";
import React from "react";
import { useState, useEffect } from "react";
import { loginUser } from "../firebase/clientApp";
import style from "../styles/login&signup.module.css";
import Link from "next/link";
import { useRouter } from "next/router";

const Login: NextPage = (props) => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();

  useEffect(() => {
    router.prefetch("/main");
  }, []);

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
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <button
          type="button"
          className={style.button}
          onClick={() => {
            loginUser(email, password).then(() =>
              router.push({
                pathname: "/main",
                query: { user: email },
              })
            );
          }}
        >
          Login
        </button>
      </div>
      <p className={style.no__account}>
        Don&#39;t have an account?{" "}
        <Link href={"/signup"}>
          <span className={style.signup}>Sign up</span>
        </Link>
      </p>
    </div>
  );
};

export default Login;
