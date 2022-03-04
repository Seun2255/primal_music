import type { NextPage } from "next";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "../components/navbar.js";
import style from "../styles/home.module.css";
import { ThemeProvider, Button } from "@mui/material";
import theme from "../components/theme";
import temp from "../assets/temp-pic.jpeg";
import SearchBar from "../components/searchBar";
import { Bars } from "react-loader-spinner";

const Home: NextPage = (props) => {
  const [result, setResult] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <div className={style.outer}>
        <Navbar />
        <div className={style.top}>
          <div className={style.intro}>
            Looking for new songs to add too your playlist? Just search here,
            I&#39;ve used deezer&#39;s extensive database of songs to ensure you
            find what you&#39;re looking for and more.{" "}
            <span id={style.hidden__text}>
              all you have to do is search for songs, listen to a short preview
              to check if you like it, add to your local Primal playlist and
              then have fun sending this playlist to your friends with a single
              click.
            </span>
          </div>
          <Bars color="#8a2be2" height={140} width={140} />
          <Button variant="contained" style={{ fontSize: 24 }}>
            <Link href={"/signup"}>Sign up</Link>
          </Button>
        </div>
        <div className={style.info}>
          <div className={style.info__box}>
            <p className={style.info__text}>
              some random text to make sure there is something there while i
              write the code, you know, for testing purposes. I really like
              japanese girls. I love sex too.
            </p>
            <div className={style.info__pic}>
              <Image src={temp} alt="search song" layout="fill" />
            </div>
          </div>
          <hr className={style.divide} />
          <div className={style.info__box}>
            <p className={style.info__text}>
              some random text to make sure there is something there while i
              write the code, you know, for testing purposes. I really like
              japanese girls. I love sex too.
            </p>
            <div className={style.info__pic}>
              <Image src={temp} alt="create playlist" layout="fill" />
            </div>
          </div>
          <hr className={style.divide} />
          <div className={style.info__box}>
            <p className={style.info__text}>
              some random text to make sure there is something there while i
              write the code, you know, for testing purposes. I really like
              japanese girls. I love sex too.
            </p>
            <div className={style.info__pic}>
              <Image src={temp} alt="share playlist" layout="fill" />
            </div>
          </div>
        </div>
        <div className={style.footer}>
          <p className={style.footer__title}>Try it out</p>
          <div className={style.search__test} onBlur={() => setResult(false)}>
            <SearchBar result={result} setResult={setResult} />
          </div>
          <p className={style.logo}>Primal Tech</p>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Home;
