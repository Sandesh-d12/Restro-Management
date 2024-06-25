import React from "react";
import styles from "./styles/title.module.css";
import Button from "./Button";

function Titles({ title, handleClick, active, icon ,id }) {
console.log('act',active)
  return (

    <div className={styles.wrapper}>
              <div className={styles.icon}>{icon}</div>
              <Button name={title} handleClick={handleClick} active={active}/>
            </div>
          );

}

export default Titles;