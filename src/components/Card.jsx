import React from "react";
import styles from "./styles/card.module.css";

export default function Card({ data }) {
  console.log(data);
  return (
    <div className={styles.container}>
      {data.map((d) => (
        <div className={styles.mainWrapper}>
          <div className={styles.imageWrapper}>{d.icon}ddd</div>
          <div className={styles.textWrapper}>{d.title}</div>
        </div>
      ))}
    </div>
  );
}
