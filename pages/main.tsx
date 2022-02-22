import type { NextPage } from "next";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut, User } from "firebase/auth";
import app from "../firebase/clientApp";
import style from "../styles/main.module.css";
import SongView from "../components/songView";
import AlbumView from "../components/albumView";
import Item from "../components/item";
import deezerAPI from "./api/deezerAPI";
import search from "../assets/search.png";
import { Bars } from "react-loader-spinner";
import SearchItem from "../components/searchItem";
import { Search } from "@mui/icons-material";
import { NextRouter, useRouter } from "next/router";
import { addToPlaylist, getPlayList, getUser } from "../firebase/clientApp";
import { Modal } from "react-responsive-modal";

const auth = getAuth(app);

const Main: NextPage = (props) => {
  const [loader, setLoader] = useState(false);
  const [songs, setSongs] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [playlist, setPlaylist]: any = useState([]);
  const [showsong, setShowsong] = useState(false);
  const [showalbum, setShowalbum] = useState(false);
  const [selectedSong, setSelectedSong] = useState({});
  const [selectedAlbum, setSelectedAlbum] = useState({});
  const [albumTracks, setAlbumTracks] = useState([]);
  const [input, setInput] = useState("");
  const [result, setResult] = useState(false);
  const [data, setData]: any = useState([]);
  const [user, setUser]: any = useState("Person");
  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const [open2, setOpen2] = useState(false);
  const onOpenModal2 = () => setOpen2(true);
  const onCloseModal2 = () => setOpen2(false);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const person = getUser(user.email);
      setUser(person);
      setPlaylist(getPlayList(user.email));
    } else {
    }
  });

  const router: NextRouter = useRouter();

  const displaySong = (song: any) => {
    setSelectedSong(song);
    setShowsong(true);
  };

  const getTracks = async (album: any) => {
    const url =
      "https://sleepy-everglades-42596.herokuapp.com/" + album.tracklist;
    const trackData = await fetch(url);
    const trackJson = await trackData.json();
    setAlbumTracks(trackJson.data);
  };

  const addSong = (song: any) => {
    addToPlaylist(user.email, song)
      .then(() => {
        var list = playlist;
        list.push(song);
        setPlaylist(list);
        onOpenModal();
        setTimeout(() => {
          onCloseModal();
        }, 2000);
      })
      .catch(() => {
        onOpenModal2();
        setTimeout(() => {
          onCloseModal2();
        }, 2000);
      });
  };

  const displayAlbum = (album: any) => {
    setSelectedAlbum(album);
    getTracks(selectedAlbum);
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

  return (
    <div className={style.outer}>
      <div className={style.navbar}>
        <p className={style.org}>{user.name}</p>
        <div
          className={style.search__container}
          id={result ? style.focus : "null"}
          onBlur={() => setResult(false)}
        >
          <div className={style.search__box}>
            <input
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
              onClick={() => {
                setData(queryDeezer());
                if (input !== "") {
                  console.log(data);
                  setResult(true);
                }
              }}
            >
              <Search
                sx={{ color: "white" }}
                style={{ width: "100%", height: "100%" }}
              />
            </button>
          </div>
          {result && (
            <div className={style.search__results}>
              {data.map((item: any) => {
                <SearchItem
                  song={item.title_short}
                  artist={item.artist.name}
                  onClick={() => displaySong(item)}
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
            {loader ? (
              <div className={style.loader}>
                <Bars color="#8a2be2" height={140} width={140} />
              </div>
            ) : (
              playlist.map((item: any, id: any) => {
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
      </div>
      {showsong && (
        <SongView
          song={selectedSong}
          closeModal={() => setShowsong(false)}
          addSong={() => addSong(selectedSong)}
        />
      )}
      {showalbum && (
        <AlbumView
          album={selectedAlbum}
          tracks={albumTracks}
          closeModal={() => setShowalbum(false)}
        />
      )}
      <Modal
        open={open}
        onClose={onCloseModal}
        center
        classNames={{
          overlay: style.customOverlay,
          modal: style.customModal,
        }}
      >
        <h2>Song Added succesfully</h2>
      </Modal>
      <Modal
        open={open}
        onClose={onCloseModal2}
        center
        classNames={{
          overlay: style.customOverlay2,
          modal: style.customModal2,
        }}
      >
        <h2>Error: song not added</h2>
      </Modal>
    </div>
  );
};

export default Main;
