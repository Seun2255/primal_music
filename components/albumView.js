import React, { useEffect, useState } from "react";
import style from "../styles/albumView.module.css";
import Image from "next/image";
import cross from "../assets/cross.png";
import { async } from "@firebase/util";
import AddSharp from "@mui/icons-material/AddSharp";
import { Button } from "@mui/material";

function AlbumView(props) {
  const { album, closeModal, tracks, displaySong, addSong } = props;

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
            <Image src={album.cover_big} layout="fill" alt="album cover" />
          </div>
          <p className={style.album__name}>{album.title}</p>
        </div>
        <div className={style.bottom}>
          {tracks.map((item, id) => {
            return (
              <div
                className={style.container}
                key={id}
                onClick={() => displaySong(item, album.cover_big)}
              >
                <div className={style.details}>
                  <div className={style.song__pic}>
                    <Image
                      layout="fill"
                      src={album.cover_big}
                      alt="album cover"
                    />
                  </div>
                  <div className={style.info}>
                    <p className={style.name}>{item.title_short}</p>
                    <p className={style.artist}>{item.artist.name}</p>
                  </div>
                </div>
                <Button
                  startIcon={
                    <AddSharp
                      style={{ color: "#8a2be2", backgroundColor: "white" }}
                    />
                  }
                  variant="contained"
                  style={{
                    backgroundColor: "white",
                    color: "#8a2be2",
                  }}
                  onClick={() => {
                    addSong();
                  }}
                >
                  Add
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default AlbumView;
