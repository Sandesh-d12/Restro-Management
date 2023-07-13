import React from "react";
import styles from "./styles/title.module.css";
import Button from "./Button";

function Titles({ data, handleClick }) {
  // function combineStrings(first, second) {
  //   if (first.length === 0 && second.length === 0) {
  //     return "";
  //   } else if (first.length === 0) {
  //     return second;
  //   } else if (second.length === 0) {
  //     return first;
  //   } else {
  //     return (
  //       first[0] + second[0] + combineStrings(first.slice(1), second.slice(1))
  //     );
  //   }
  // }

  // const first = "hello";
  // const second = "bear";
  // const combined = combineStrings(first, second);
  // console.log(combined);
  return (
    <div>
      {data.map((s) => (
        <div className={styles.wrapper}>
          <div className={styles.icon}>{s.icon}</div>
          {/* <button onClick={handleClick} className={styles.title}>
            {s.title}
          </button> */}
          <Button name={s.title} handleClick={s.onClick} />
        </div>
      ))}
    </div>
  );
}

export default Titles;
