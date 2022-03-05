import React, { useEffect, useState } from "react";
import style from "../styles/songView.module.css";
import Image from "next/image";
import cross from "../assets/cross.png";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import AddSharp from "@mui/icons-material/AddSharp";
import PlayArrow from "@mui/icons-material/PlayArrow";
import Pause from "@mui/icons-material/Pause";
import { Modal } from "react-responsive-modal";

function SongView(props) {
  const { song, closeModal, addSong, page } = props;
  console.log(song);
  var whole = Math.trunc(song.duration / 60);
  var deci = song.duration % 60;
  if (deci < 10) deci = "0" + deci;
  const duration = whole + ":" + deci;
  const [isPlaying, setIsPlaying] = useState(false);
  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const togglePlay = () => {
    var audioElement = document.getElementById("myAudio");
    if (isPlaying) {
      audioElement.pause();
    } else {
      audioElement.play();
    }

    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    document.getElementById("myAudio").play();
    setIsPlaying(true);
  }, []);

  return (
    <div className={style.modal}>
      <audio
        id="myAudio"
        src={song.preview}
        preload="auto"
        onEnded={() => setIsPlaying(false)}
      />
      <div className={style.outer}>
        <div className={style.close__button}>
          <div className={style.white}></div>
          <Image
            src={cross}
            alt="close-button"
            onClick={() => {
              document.getElementById("myAudio").pause();
              closeModal();
            }}
            layout="fill"
          />
        </div>
        <div className={style.top}>
          <div className={style.album__cover}>
            <Image src={song.album.cover_big} layout="fill" alt="album cover" />
          </div>
          <p className={style.album__name}>{song.title_short}</p>
          <ButtonGroup size="small">
            <Button
              startIcon={
                isPlaying ? (
                  <Pause
                    style={{ color: "#8a2be2", backgroundColor: "white" }}
                  />
                ) : (
                  <PlayArrow
                    style={{ color: "#8a2be2", backgroundColor: "white" }}
                  />
                )
              }
              variant="contained"
              style={{
                backgroundColor: "white",
                color: "#8a2be2",
              }}
              onClick={() => togglePlay()}
            >
              {isPlaying ? "Pause" : "Play"}
            </Button>
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
                page == "home" ? onOpenModal() : addSong();
              }}
            >
              Add to Playlist
            </Button>
          </ButtonGroup>
        </div>
        <div className={style.bottom}>
          <div className={style.container}>
            <p className={style.property}>artist</p>
            <p className={style.info}>{song.artist.name}</p>
          </div>
          <div className={style.container}>
            <p className={style.property}>album</p>
            <p className={style.info}>{song.album.title}</p>
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
      <Modal
        open={open}
        onClose={onCloseModal}
        center
        classNames={{
          overlay: style.customOverlay,
          modal: style.customModal,
        }}
      >
        <h2>Please login to use this feature</h2>
      </Modal>
    </div>
  );
}

export default SongView;
