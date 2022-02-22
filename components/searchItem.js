import React, { useState } from "react";
import style from "../styles/searchItem.module.css";

function SearchItem(props) {
  const { song, artist, onClick } = props;

  return (
    <div
      className={style.outer}
      onClick={() => {
        console.log("Should be working");
        onClick();
      }}
    >
      <p className={style.song}>{song}</p>
      <p className={style.artist}>{artist}</p>
    </div>
  );
}

export default SearchItem;
