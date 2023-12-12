import React from "react";
import styles from "./styles/button.module.css";

export default function Button({ name, handleClick }) {
  return (
    <button className={styles.wrapper} onClick={handleClick}>
      <span style={{ fontSize: "18px", fontWeight: 500, lineHeight: "18px" }}>
        {" "}
        {name}
      </span>
    </button>
  );
}
