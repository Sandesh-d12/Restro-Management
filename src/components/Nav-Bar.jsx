import React from "react";
import styles from "./styles/navBar.module.css";
import Titles from "./Titles";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();

  const data = [
    {
      id: 1,
      title: "Dashboard",
      icon: "",
      onClick: () => {
        navigate("/dashboard");
      },
    },
    {
      id: 2,
      title: "Orders",
      icon: "",
      onClick: () => {
        navigate("/orders");
      },
    },
    {
      id: 3,
      title: "Booking",
      icon: "",
      onClick: () => {
        navigate("/booking");
      },
    },
    {
      id: 4,
      title: "Siting Plan",
      icon: "",
      onClick: () => {
        navigate("/sittingPlan");
      },
    },
    {
      id: 5,
      title: "Food Menu",
      icon: "",
      onClick: () => {
        navigate("/foodMenu");
      },
    },
    {
      id: 6,
      title: "Pages",
      icon: "",
      onClick: () => {
        navigate("/pages");
      },
    },
  ];
  return (
    <>
      <div className={styles.Container}>
        <div className={styles.Wrapper}>
          <div className={styles.ControlPanel}>My Restro</div>
          <div className={styles.right}></div>
        </div>
      </div>
      <div className={styles.sideBar}>
        <Titles data={data} />{" "}
      </div>
    </>
  );
}

// export default NavBar;
