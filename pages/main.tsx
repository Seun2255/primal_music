import type { NextPage } from "next";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut, User } from "firebase/auth";
import app from "../firebase/clientApp";
import style from "../styles/main.module.css";
import SongView from "../components/songView";
import AlbumView from "../components/albumView";
import Item from "../components/item";
import { db } from "../firebase/clientApp";
import { doc, getDoc } from "firebase/firestore";
import SearchBar from "../components/searchBar";
import deezerAPI from "./api/deezerAPI";
import search from "../assets/search.png";
import { Bars } from "react-loader-spinner";
import SearchItem from "../components/searchItem";

// var currentUser: User | null;
// var signedIn: boolean;
// var name: string | null;

// const auth = getAuth(app);

const Main: NextPage = (props) => {
  const [loader, setLoader] = useState(false);
  const [songs, setSongs] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [showsong, setShowsong] = useState(false);
  const [showalbum, setShowalbum] = useState(false);
  const [selectedSong, setSelectedSong] = useState({});
  const [selectedAlbum, setSelectedAlbum] = useState({});
  const [input, setInput] = useState("");
  const [result, setResult] = useState(false);
  const [data, setData]: any = useState([]);

  const displaySong = (song: any) => {
    setSelectedSong(song);
    setShowsong(true);
  };

  const displayAlbum = (album: any) => {
    setSelectedAlbum(album);
    setShowalbum(true);
  };

  const getData = async () => {
    setLoader(true);
    const tracksData = await deezerAPI.tracks();
    const albumsData = await deezerAPI.albums();

    setSongs(tracksData);
    setAlbums(albumsData);
    setLoader(false);
  };

  const queryDeezer = async () => {
    const results = await deezerAPI.search(input);
    return results;
  };

  useEffect(() => {
    getData();
  }, []);

  // const [user, setUser]: any = useState("Person");
  // onAuthStateChanged(auth, (user) => {
  //   if (user) {
  //     console.log("Logged in");
  //     currentUser = user;
  //     setUser(currentUser.email);
  //     signedIn = true;
  //   } else {
  //     console.log("Not logged in");
  //     signedIn = false;
  //   }
  // });

  return (
    <div className={style.outer}>
      <div className={style.navbar}>
        <p className={style.org}>Primal Tech</p>
        <div className={style.search__container}>
          <div className={style.search__box}>
            <input
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
                setData(queryDeezer());
                if (input !== "") {
                  console.log(data);
                  setResult(true);
                }
              }}
            >
              <Image src={search} layout="fill" />
            </button>
          </div>
          {false && (
            <div className={style.search__results}>
              {data.map((item: any) => {
                <SearchItem
                  song={item.title_short}
                  artist={item.artist.name}
                />;
              })}
            </div>
          )}
        </div>
      </div>
      <div className={style.song__section}>
        <div className={style.list}>
          <p className={style.list__name}>Top Tracks</p>
          <div className={style.items__container}>
            {loader ? (
              <div className={style.loader}>
                <Bars color="#8a2be2" height={140} width={140} />
              </div>
            ) : (
              songs.map((item: any, id: any) => {
                return (
                  <Item
                    name={item.title_short}
                    cover={item.album.cover_big}
                    key={id}
                    onClick={() => displaySong(item)}
                  />
                );
              })
            )}
          </div>
        </div>
        <div className={style.list}>
          <p className={style.list__name}>Top Albums</p>
          <div className={style.items__container}>
            {loader ? (
              <div className={style.loader}>
                <Bars color="#8a2be2" height={140} width={140} />
              </div>
            ) : (
              albums.map((item: any, id: any) => {
                return (
                  <Item
                    name={item.title}
                    cover={item.cover_big}
                    key={id}
                    onClick={() => displayAlbum(item)}
                  />
                );
              })
            )}
          </div>
        </div>
        <div className={style.list}>
          <p className={style.list__name}>My Playlist</p>
          <div className={style.items__container}>
            {/*Item component goes here*/}
          </div>
        </div>
      </div>
      {showsong && (
        <SongView song={selectedSong} closeModal={() => setShowsong(false)} />
      )}
      {showalbum && (
        <AlbumView
          album={selectedAlbum}
          closeModal={() => setShowalbum(false)}
        />
      )}
    </div>
  );
};

export default Main;
