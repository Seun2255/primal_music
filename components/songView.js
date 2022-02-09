import React from "react";
import style from "../styles/songView.module.css";
import Image from "next/image";
import play from "../assets/play.png";
import pause from "../assets/pause.png";
import cross from "../assets/cross.png";

function SongView(props) {
  const { song, closeModal } = props;
  var whole = Math.trunc(song.duration / 60);
  var deci = (song.duration / 60).toString().substring(2);
  const duration = whole + ":" + deci;

  return (
    <div className={style.modal}>
      <div className={style.outer}>
        <div className={style.close__button}>
          <div className={style.white}></div>
          <img
            src={cross}
            alt="close-button"
            className={style.close}
            onClick={() => closeModal()}
          />
        </div>
        <div className={style.top}></div>
        <div className={style.bottom}>
          <div className={style.play__button}>
            <Image width={30} height={30} src={play} />
          </div>
          <div className={style.container}>
            <p className={style.property}>artist</p>
            <p className={style.info}>{song.artist.name}</p>
          </div>
          <div className={style.container}>
            <p className={style.property}>album</p>
            <p className={style.info}>song.album.title</p>
          </div>
          <div className={style.container}>
            <p className={style.property}>duration</p>
            <p className={style.info}>{duration}</p>
          </div>
          <div className={style.container}>
            <p className={style.property}>rank</p>
            <p className={style.info}>{song.rank}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SongView;
