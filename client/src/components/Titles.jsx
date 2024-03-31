import React from "react";
import styles from "./styles/title.module.css";
import Button from "./Button";

function Titles({ data, handleClick }) {
  const userString = localStorage.getItem("user") ?? null;
  let user = userString !== "undefined" ? JSON.parse(userString) : null;

  return (
    <div style={{
    }}>
      {data.map((s, index) => {
        if (user.data.userType === 'admin' || user.data.userType === s.type) {
          return (
            <div className={styles.wrapper} key={index}>
              <div className={styles.icon}>{s.icon}</div>
              <Button name={s.title} handleClick={s.onClick} />
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}

export default Titles;