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
      title: "Table Management",
      icon: "",
      onClick: () => {
        navigate("/tables");
      },
    },
    {
      id: 4,
      title: "Users",
      icon: "",
      onClick: () => {
        navigate("/users");
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
      <div>
        <div className={styles.Container}>
          <div className={styles.Wrapper}>
            <div className={styles.ControlPanel}>My Restro</div>
            <div className={styles.right}></div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            width: "100%",
            backgroundColor: "red",
            height: "100%",
          }}
        >
          <div style={{ width: "20%", backgroundColor: "green" }}>
            {" "}
            //left side
            <div className={styles.sideBar}>
              <Titles data={data} />
            </div>
          </div>
          <div style={{ width: "80%", backgroundColor: "blue" }}>
            Rigth Side
          </div>
        </div>
      </div>
    </>
  );
}

// export default NavBar;
