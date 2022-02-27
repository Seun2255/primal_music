import React, { useEffect, useState } from "react";
import style from "../styles/shareView.module.css";
import Image from "next/image";
import cross from "../assets/cross.png";
import { async } from "@firebase/util";
import { Button } from "@mui/material";
import { Share } from "@mui/icons-material";
import { Modal } from "react-responsive-modal";
import { send } from "emailjs-com";

function ShareView(props) {
  const { playlist, closeModal, name } = props;
  const [mode, setMode] = useState("Email");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("+234");
  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const [open2, setOpen2] = useState(false);
  const onOpenModal2 = () => setOpen2(true);
  const onCloseModal2 = () => setOpen2(false);

  var message;
  playlist.tracks.map((item) => {
    var text = item.title_short + " - " + item.artist.name + "\n";
    message += text;
  });

  const submit = async () => {
    const data = {
      from_name: name,
      to_name: "",
      message: message,
      reply_to: email,
    };
    send(
      process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID,
      "template_onyx7dk",
      data,
      "DVWjfHmYNWHWfqrQ5"
    )
      .then((response) => {
        onOpenModal();
        console.log("SUCCESS!", response.status, response.text);
        setTimeout(() => {
          onCloseModal();
        }, 2000);
      })
      .catch((err) => {
        console.log("FAILED...", err);
      });
  };

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
          <Button
            variant="contained"
            style={{
              backgroundColor: "red",
              color: "white",
              cursor: "pointer",
              marginRight: "4px",
            }}
            onClick={() => {
              setMode("Email");
            }}
          >
            Email
          </Button>
          <Button
            variant="contained"
            style={{
              backgroundColor: "green",
              color: "white",
              cursor: "pointer",
            }}
            onClick={() => {
              setMode("Whatsapp");
            }}
          >
            Whatsapp
          </Button>
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
              startIcon={
                <Share style={{ color: "white", backgroundColor: "#8a2be2" }} />
              }
              variant="contained"
              style={{
                backgroundColor: "#8a2be2",
                color: "white",
                cursor: "pointer",
              }}
              onClick={() => {
                // page == "home" ? onOpenModal() : addSong();
              }}
            >
              Share
            </Button>
          </div>
        ) : (
          <div className={style.container}>
            <div className={style.item}>
              <p className={style.item__name}>Number</p>
              <input
                className={style.item__input}
                onChange={(e) => setNumber(e.target.value)}
                value={number}
              />
            </div>
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
              onClick={() => {
                // page == "home" ? onOpenModal() : addSong();
              }}
            >
              Share
            </Button>
          </div>
        )}
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
        <h2>Playlist sent</h2>
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
        <h2>Failed, please try again</h2>
      </Modal>
    </div>
  );
}

export default ShareView;
