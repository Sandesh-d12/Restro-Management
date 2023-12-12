import React from "react";
import styles from "./styles/title.module.css";
import Button from "./Button";

function Titles({ data, handleClick }) {
  return (
    <div>
      {data.map((s, index) => (
        <div className={styles.wrapper} key={index}>
          <div className={styles.icon}>{s.icon}</div>
          <Button name={s.title} handleClick={s.onClick} />
        </div>
      ))}
    </div>
  );
}

export default Titles;
