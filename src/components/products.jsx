import React, { useState } from "react";
import styles from "./styles/card.module.css";
import PlaceOrderModal from "./orderModal";

export default function Products({ data }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    console.log("open", open);
  };
  return (
    <div className={styles.container}>
      <PlaceOrderModal handleOpen={open} handleClose={handleClose} />
      {data.map((d) => (
        <>
          <div className={styles.mainWrapper}>
            <div className={styles.imageWrapper}>{d.icon}ddd</div>
            <div className={styles.textWrapper}>{d.title}</div>
            <div className={styles.button}>
              <button onClick={handleOpen}>Order</button>
            </div>
          </div>
        </>
      ))}
    </div>
  );
}
