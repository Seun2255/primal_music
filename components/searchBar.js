import React, { useState } from "react";
import style from "../styles/searchBar.module.css";
import { Button, TextField } from "@mui/material";
import { Search } from "@mui/icons-material";
import SearchItem from "./searchItem";
import search from "../pages/api/functions";

function SearchBar(props) {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(false);
  const [data, setData] = useState({});

  return (
    <div className={style.outer}>
      <div className={style.search__box}>
        <TextField
          variant="outlined"
          onChange={(e) => {
            setInput(e.target.value);
            if (input === "") {
              setResult(false);
            }
          }}
          placeholder="Search"
          style={{
            width: "85%",
            height: "100%",
            borderRadius: "50vh",
          }}
        />
        <Button
          style={{
            width: "10%",
            height: "100%",
          }}
          onClick={() => {
            console.log(search(input));
            setData(search(input));
            if (input !== "") {
              setResult(true);
            }
          }}
        >
          search
        </Button>
      </div>
      {result && <div className={style.search__results}></div>}
    </div>
  );
}

export default SearchBar;
