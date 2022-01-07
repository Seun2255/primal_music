import type { NextPage } from "next";
import React, { useState } from "react";
import style from "../styles/search.module.css";
import { Button } from "@mui/material";

const search: NextPage = (props) => {
  return (
    <div className={style.outer}>
      <div className={style.up}>
        <div className={style.song__box}>
          <img className={style.song} />
          <div className={style.options}>
            <Button>Add to</Button>
          </div>
        </div>
        <div className={style.search__box}>
          <div className={style.search__input}></div>
          <img className={style.search__icon} />
        </div>
      </div>
      <div className={style.down}>
        <div className={style.left}></div>
        <div className={style.right}></div>
      </div>
    </div>
  );
};

export default search;
