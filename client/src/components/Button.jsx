import React from "react";
import styles from "./styles/button.module.css";

export default function Button({ name, handleClick, active }) {

  return (
    <button className={styles.wrapper} onClick={handleClick}>
      <span style={{ fontSize: "18px", lineHeight: "18px", fontWeight: active ? 800 : 500 }}>
        {" "}
        {name}
      </span>
    </button>
  );
}
