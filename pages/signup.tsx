import type { NextPage } from "next";
import React from "react";
import style from "../styles/login&signup.module.css";
import { useState, useEffect } from "react";
import { addUser } from "../firebase/clientApp";
import { TextField, ThemeProvider } from "@mui/material";
import theme from "../components/theme";
import { useRouter } from "next/router";

const Signup: NextPage = (props) => {
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [warning, setWarning] = useState(false);
  const [warning2, setWarning2] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const router = useRouter();

  const confirmPassword = () => {
    if (password1 !== password2) {
      setWarning2(true);
      setConfirmed(false);
    } else {
      setWarning2(false);
      setConfirmed(true);
    }
  };

  const confirmLength = () => {
    if (password1.length < 6) {
      setConfirmed(false);
      setWarning(true);
    } else {
      setConfirmed(true);
      setWarning(false);
    }
  };

  useEffect(() => {
    router.prefetch("/main");
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div className={style.outer}>
        <p className={style.header}>Sign Up</p>
        <div className={style.container}>
          <div className={style.item}>
            <p className={style.item__name}>Username</p>
            <TextField
              variant="filled"
              placeholder="John Doe"
              onChange={(e) => setUsername(e.target.value)}
              color="primary"
            />
          </div>
          <div className={style.item}>
            <p className={style.item__name}>Email</p>
            <TextField
              variant="filled"
              placeholder="user@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={style.item}>
            <p className={style.item__name}>Password</p>
            <TextField
              variant="filled"
              type={"password"}
              placeholder="********"
              onChange={(e) => setPassword1(e.target.value)}
              onBlur={() => confirmLength()}
            />
            {warning && (
              <p className={style.warning}>
                Password must be at least 6 letters
              </p>
            )}
          </div>
          <div className={style.item}>
            <p className={style.item__name}>confirm Password</p>
            <TextField
              variant="filled"
              type={"password"}
              placeholder="********"
              onChange={(e) => setPassword2(e.target.value)}
              onBlur={() => confirmPassword()}
            />
            {warning2 && (
              <p className={style.warning}>Password does not match</p>
            )}
          </div>
          <button
            type="button"
            className={style.button}
            onClick={() => {
              if (
                confirmed &&
                password1 != "" &&
                password2 != "" &&
                email != "" &&
                username != ""
              ) {
                addUser(email, password2, username).then(() =>
                  router.push({
                    pathname: "/main",
                    query: { user: email },
                  })
                );
              }
            }}
          >
            Sign up
          </button>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Signup;
