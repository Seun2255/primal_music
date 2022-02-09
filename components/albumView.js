import React, { useEffect, useState } from "react";
import style from "../styles/albumView.module.css";
import Image from "next/image";
import heart from "../assets/heart.png";
import redheart from "../assets/redheart.png";
import cross from "../assets/cross.png";
import { async } from "@firebase/util";

function AlbumView(props) {
  const { album, closeModal } = props;
  const [tracks, setTracks] = useState([]);

  const getTracks = async () => {
    const url =
      "https://sleepy-everglades-42596.herokuapp.com/" + album.tracklist;
    const trackData = await fetch(url);
    const trackJson = await trackData.json();
    return trackJson.data;
  };

  const initialize = async () => {
    setTracks(await getTracks());
  };

  useEffect(() => {
    initialize();
  }, []);

  return (
    <div className={style.modal}>
      <div className={style.outer}>
        <div className={style.close__button}>
          <div className={style.white}></div>
          <Image
            src={cross}
            alt="close-button"
            className={style.close}
            onClick={() => closeModal()}
            layout="fill"
          />
        </div>
        <div className={style.top}>
          <div className={style.album__cover}>
            <Image src={album.cover_big} layout="fill" />
          </div>
          <p className={style.album__name}>{album.title}</p>
        </div>
        <div className={style.bottom}>
          {tracks.map((item, id) => {
            console.log(item);
            return (
              <div className={style.container} key={id}>
                <div className={style.details}>
                  <div className={style.song__pic}>
                    <Image layout="fill" src={album.cover_big} />
                  </div>
                  <div className={style.info}>
                    <p className={style.name}>{item.title_short}</p>
                    <p className={style.artist}>{item.artist.name}</p>
                  </div>
                </div>
                <div className={style.like}>
                  <Image width={20} height={20} src={heart} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default AlbumView;
