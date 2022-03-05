import React, { useState } from "react";
import style from "../styles/searchBar.module.css";
import Search from "@mui/icons-material/Search";
import SearchItem from "./searchItem";
import deezerAPI from "../pages/api/deezerAPI";
import SongView from "./songView";
import { Bars } from "react-loader-spinner";
import Close from "@mui/icons-material/Close";

function SearchBar(props) {
  const [result, setResult] = useState(false);
  const [input, setInput] = useState("");
  const [data, setData] = useState(["test", 5]);
  const [showsong, setShowsong] = useState(false);
  const [selectedSong, setSelectedSong] = useState({});
  const [loader, setLoader] = useState(false);

  const displaySong = (song) => {
    setSelectedSong(song);
    setShowsong(true);
  };

  return (
    <div className={style.outer} id={result ? style.focus : "null"}>
      <div className={style.search__box}>
        <input
          type="search"
          placeholder="Search"
          className={style.search__input}
          id={result ? style.input__focus : "null"}
          onChange={(e) => {
            setInput(e.target.value);
            if (input === "") {
              setResult(false);
            }
          }}
        />
        <button
          className={style.search__button}
          onClick={async () => {
            if (result) setResult(false);
            else if (input !== "") {
              setLoader(true);
              setResult(true);
              setData(await deezerAPI.search(input));
              setLoader(false);
            }
          }}
        >
          {result ? (
            <Close
              sx={{ color: "white" }}
              style={{ width: "100%", height: "100%" }}
            />
          ) : (
            <Search
              sx={{ color: "white" }}
              style={{ width: "100%", height: "100%" }}
            />
          )}
        </button>
      </div>
      {result &&
        (loader ? (
          <div className={style.loader}>
            <Bars color="#8a2be2" height={140} width={140} />
          </div>
        ) : (
          <div className={style.search__results}>
            {data.map((item, id) => {
              return (
                <SearchItem
                  song={item.title_short}
                  artist={item.artist.name}
                  onClick={() => {
                    displaySong(item);
                  }}
                  key={id}
                />
              );
            })}
          </div>
        ))}
      {showsong && (
        <SongView
          song={selectedSong}
          closeModal={() => setShowsong(false)}
          page="home"
        />
      )}
    </div>
  );
}

export default SearchBar;
