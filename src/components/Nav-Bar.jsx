import React from "react";
import { useNavigate } from "react-router-dom";
import Titles from "./Titles";
import Profile from "./profile/Avatar";
import styles from "./styles/navBar.module.css";

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
      title: "Items",
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
        navigate("/#");
      },
    },
    {
      id: 6,
      title: "Pages",
      icon: "",
      onClick: () => {
        navigate("/#");
      },
    },
  ];
  return (
    <>
      <div>
        <div className={styles.Container}>
          <div className={styles.Wrapper}>
            <div className={styles.ControlPanel}>
              <img
                src="/tea.jpg"
                width={"50px"}
                height={"50px"}
                style={{ marginRight: "20px", marginLeft: "5px" }}
              ></img>
              <span style={{ paddingTop: "10px" }}>My Restro </span>
            </div>
            <div className={styles.right}>
              <Profile />
            </div>
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
          <div>
            <div className={styles.sideBar}>
              <Titles data={data} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
