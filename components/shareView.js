import React, { useEffect, useState } from "react";
import style from "../styles/shareView.module.css";
import Image from "next/image";
import cross from "../assets/cross.png";
import { async } from "@firebase/util";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Share from "@mui/icons-material/Share";
import Whatsapp from "@mui/icons-material/WhatsApp";
import Gmail from "@mui/icons-material/Email";

function ShareView(props) {
  const { playlist, closeModal, name } = props;
  const [mode, setMode] = useState("Whatsapp");
  const [email, setEmail] = useState("");

  var message;
  playlist.tracks.map((item) => {
    var text = item.title_short + " - " + item.artist.name + "\n";
    message += text;
  });

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
        <div className={style.switch}>
          <ButtonGroup>
            <Button
              startIcon={<Whatsapp />}
              variant="contained"
              style={{
                backgroundColor: "#8a2be2",
                color: "white",
                cursor: "pointer",
                marginRight: "4px",
              }}
              onClick={() => {
                setMode("Whatsapp");
              }}
            >
              Whatsapp
            </Button>
            <Button
              startIcon={<Gmail />}
              variant="contained"
              style={{
                backgroundColor: "#8a2be2",
                color: "white",
                cursor: "pointer",
              }}
              onClick={() => {
                setMode("Email");
              }}
            >
              Email
            </Button>
          </ButtonGroup>
        </div>
        {mode == "Email" ? (
          <div className={style.container}>
            <div className={style.item}>
              <p className={style.item__name}>Email</p>
              <input
                className={style.item__input}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>
            <Button
              startIcon={<Share />}
              variant="contained"
              style={{
                backgroundColor: "#8a2be2",
                color: "white",
                cursor: "pointer",
              }}
            >
              <a
                href={`mailto:${email}?subject=Check out this playlist Subject&body=${message}`}
              >
                Share
              </a>
            </Button>
          </div>
        ) : (
          <div className={style.container}>
            <Button
              startIcon={<Share />}
              variant="contained"
              style={{
                backgroundColor: "#8a2be2",
                color: "white",
                cursor: "pointer",
              }}
            >
              <a href={`https://wa.me/?text=${message}`}>Share</a>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ShareView;
