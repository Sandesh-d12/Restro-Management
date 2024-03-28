import React from "react";
import styles from "./styles/title.module.css";
import Button from "./Button";

function Titles({ data, handleClick }) {
  const userString = localStorage.getItem("user") ?? null;
  let user = userString !== "undefined" ? JSON.parse(userString) : null;

  return (
    <div>
      {data.map((s, index) => {
        // If userType is 'admin', render all items. Otherwise, match userType.
        if (user.data.userType === 'admin' || user.data.userType === s.type) {
          return (
            <div className={styles.wrapper} key={index}>
              <div className={styles.icon}>{s.icon}</div>
              <Button name={s.title} handleClick={s.onClick} />
            </div>
          );
        }
        return null; // Return null if no condition is met
      })}
    </div>
  );
}

export default Titles;