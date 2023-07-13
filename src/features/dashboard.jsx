import React from "react";
import styles from "./styles/dashboard.module.css";
import Card from "../components/Card";

export default function Dashboard() {
  const data = [
    {
      id: 1,
      title: "Dashboard",
      icon: "",
    },
    {
      id: 2,
      title: "Orders",
      icon: "",
    },
    {
      id: 3,
      title: "Booking",
      icon: "",
    },
    {
      id: 4,
      title: "Siting Plan",
      icon: "",
    },
    {
      id: 5,
      title: "Food Menu",
      icon: "",
    },
    {
      id: 6,
      title: "Pages",
      icon: "",
    },
  ];

  return (
    <div className={styles.wrapper}>
      {" "}
      Dashboard{" "}
      <div className={styles.card}>
        <Card data={data} />
      </div>{" "}
    </div>
  );
}
