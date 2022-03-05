import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import app from "../firebase/clientApp";
import style from "../styles/main.module.css";
import SongView from "../components/songView";
import AlbumView from "../components/albumView";
import ShareView from "../components/shareView";
import Item from "../components/item";
import deezerAPI from "./api/deezerAPI";
import { Bars } from "react-loader-spinner";
import SearchItem from "../components/searchItem";
import { NextRouter, useRouter } from "next/router";
import { addToPlaylist, getPlayList, getUser } from "../firebase/clientApp";
import { Modal } from "react-responsive-modal";
import Button from "@mui/material/Button";
import Share from "@mui/icons-material/Share";
import Search from "@mui/icons-material/Search";

const auth = getAuth(app);

const Main: NextPage = (props) => {
  const [loader, setLoader] = useState(false);
  const [songs, setSongs] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [playlist, setPlaylist]: any = useState([]);
  const [showsong, setShowsong] = useState(false);
  const [showalbum, setShowalbum] = useState(false);
  const [showshare, setShowshare] = useState(false);
  const [selectedSong, setSelectedSong] = useState({});
  const [selectedAlbum, setSelectedAlbum] = useState({});
  const [albumTracks, setAlbumTracks] = useState([]);
  const [input, setInput] = useState("");
  const [result, setResult] = useState(false);
  const [data, setData]: any = useState([]);
  const [open, setOpen] = useState(false);
  const [resultLoader, setResultLoader] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const [open2, setOpen2] = useState(false);
  const onOpenModal2 = () => setOpen2(true);
  const onCloseModal2 = () => setOpen2(false);
  const [name, setName] = useState("Primal Tech");
  const [phone, setPhone] = useState(false);
  const router: NextRouter = useRouter();

  const displaySong = (song: any, cover: any = false) => {
    var tempSong = song;
    if (cover) {
      tempSong.album = {};
      tempSong.album.cover_big = cover;
    }
    setSelectedSong(tempSong);
    setShowsong(true);
  };

  const getTracks = async (album: any) => {
    const url =
      "https://sleepy-everglades-42596.herokuapp.com/" + album.tracklist;
    const trackData = await fetch(url);
    const trackJson = await trackData.json();
    setAlbumTracks(trackJson.data);
  };

  const addSong = (songs: any) => {
    addToPlaylist(router.query.user, songs)
      .then(() => {
        setPlaylist({ tracks: songs });
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

  const displayAlbum = async (album: any) => {
    setSelectedAlbum(album);
    await getTracks(album);
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

  const starter = async () => {
    const person: any = await getUser(router.query.user);
    if (person) {
      setName(person.name);
    }
    var playList = await getPlayList(router.query.user);
    playlist == [] ? setPlaylist([]) : setPlaylist(playList);
  };

  useEffect(() => {
    getData();
    starter();
    const mediaQuery = window.matchMedia("(max-width: 600px)");
    setPhone(!mediaQuery.matches);
  }, []);

  return (
    <div className={style.outer}>
      <div className={style.navbar} id={phone ? "null" : style.center}>
        <p className={style.org}>{name}</p>
        <div
          className={style.search__container}
          id={result ? style.focus : "null"}
        >
          <div className={style.search__box}>
            <input
              className={
                phone ? style.search__input : style.search__input__phone
              }
              id={result ? style.input__focus : "null"}
              onChange={(e) => {
                setInput(e.target.value);
                if (input === "") {
                  setResult(false);
                }
              }}
            />
            <Button
              startIcon={
                <Search sx={{ color: "white" }} style={{ height: "100%" }} />
              }
              variant="contained"
              style={{
                backgroundColor: "rgb(71, 0, 138)",
                color: "white",
                height: "100%",
              }}
              size="small"
              onClick={async () => {
                if (result) setResult(false);
                else if (input !== "") {
                  setResult(true);
                  setResultLoader(true);
                  await setData(await queryDeezer());
                  setResultLoader(false);
                }
              }}
            >
              {result ? "Close" : "Search"}
            </Button>
          </div>
          {result &&
            (resultLoader ? (
              <div className={style.loader}>
                <Bars color="#8a2be2" height={140} width={140} />
              </div>
            ) : (
              <div className={style.search__results}>
                {data.map((item: any, id: any) => {
                  return (
                    <SearchItem
                      key={id}
                      song={item.title_short}
                      artist={item.artist.name}
                      onClick={() => {
                        displaySong(item);
                      }}
                    />
                  );
                })}
              </div>
            ))}
        </div>
      </div>
      <div className={style.song__section}>
        <div className={style.list}>
          <p className={style.list__name}>Top Tracks</p>
          <div className={style.items__container}>
            {loader ? (
              <div className={style.main__loader}>
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
              <div className={style.main__loader}>
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
                    displaySong={displaySong}
                  />
                );
              })
            )}
          </div>
        </div>
        <div className={style.list}>
          <div className={style.playlist__share}>
            <p className={style.list__name}>My Playlist</p>
            <Button
              startIcon={
                <Share style={{ color: "white", backgroundColor: "#8a2be2" }} />
              }
              variant="contained"
              style={{
                backgroundColor: "#8a2be2",
                color: "white",
                cursor: "pointer",
              }}
              onClick={() => setShowshare(true)}
            >
              Share
            </Button>
          </div>
          <div className={style.items__container}>
            {loader ? (
              <div className={style.main__loader}>
                <Bars color="#8a2be2" height={140} width={140} />
              </div>
            ) : playlist.length === 0 ? (
              <div className={style.nothing}>There&#39;s Nothing here</div>
            ) : (
              playlist.tracks.map((item: any, id: any) => {
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
      </div>
      {showsong && (
        <SongView
          song={selectedSong}
          closeModal={() => setShowsong(false)}
          addSong={() => {
            var tempList = playlist.tracks;
            tempList.push(selectedSong);
            addSong(tempList);
          }}
        />
      )}
      {showalbum && (
        <AlbumView
          album={selectedAlbum}
          tracks={albumTracks}
          closeModal={() => setShowalbum(false)}
          displaySong={displaySong}
          addSong={() => {
            var tempList = playlist.tracks;
            tempList.push(selectedSong);
            addSong(tempList);
          }}
        />
      )}
      {showshare && (
        <ShareView
          playlist={playlist}
          closeModal={() => setShowshare(false)}
          name={name}
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
        open={open2}
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
