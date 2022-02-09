import React, { useState } from "react";
import style from "../styles/searchBar.module.css";
import { Search } from "@mui/icons-material";
import SearchItem from "./searchItem";
import search from "../pages/api/deezerAPI";

function SearchBar(props) {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(false);
  const [data, setData] = useState([]);

  return (
    <div className={style.outer}>
      <div className={style.search__box}>
        <input
          type="search"
          placeholder="Search"
          className={style.search__input}
          onChange={(e) => {
            setInput(e.target.value);
            if (input === "") {
              setResult(false);
            }
          }}
        />
        <button
          className={style.search__button}
          onClick={() => {
            setData(search(input));
            if (input !== "") {
              setResult(true);
            }
          }}
        >
          search
        </button>
      </div>
      {result && (
        <div className={style.search__results}>
          {data.map((item) => {
            <SearchItem song={item.title_short} artist={item.artist.name} />;
          })}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
