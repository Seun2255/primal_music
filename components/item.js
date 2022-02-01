import React from "react";
import style from "../styles/item.module.css";
import Image from "next/image";

function Item(props) {
  const { name, cover } = { props };

  return (
    <div className={style.outer}>
      <div className={style.img}>
        <Image src={cover} alt="cover" />
      </div>
      <p className={style.text}>{name}</p>
    </div>
  );
}

export default Item;
