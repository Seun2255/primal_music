import React from "react";
import style from "../styles/item.module.css";
import Image from "next/image";

function Item(props) {
  const { name, cover, onClick } = props;

  return (
    <div className={style.outer} onClick={() => onClick()}>
      <div className={style.img}>
        {cover && <Image src={cover} alt="cover" layout="fill" />}
      </div>
      <p className={style.text}>{name}</p>
    </div>
  );
}

export default Item;
