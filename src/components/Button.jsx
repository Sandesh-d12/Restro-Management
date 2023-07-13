import React from "react";
import styles from "./styles/button.module.css";

export default function Button({ name, handleClick }) {
  console.log(name);
  return (
    <button className={styles.wrapper} onClick={handleClick}>
      <span> {name}</span>
    </button>
  );
}
