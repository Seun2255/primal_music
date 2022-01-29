import React, { useState } from "react";
import style from "../styles/searchItem.module.css";

function SearchItem(props, { params }) {
  const { song, artist } = { params };

  return (
    <div className={style.outer}>
      <p className={style.song}>{song}</p>
      <p className={style.artist}>{artist}</p>
    </div>
  );
}

export default SearchItem;
