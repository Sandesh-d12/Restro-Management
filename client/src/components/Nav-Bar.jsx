import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Titles from "./Titles";
import Profile from "./profile/Avatar";
import styles from "./styles/navBar.module.css";
import { Outlet } from "react-router-dom";

export default function NavBar({ child }) {
  const navigate = useNavigate();

  const data = [
    {
      id: 1,
      title: "Dashboard",
      icon: "",
      onClick: () => {
        navigate("/dashboard");
      },
      // type:['admin']
     
    },
    {
      id: 2,
      title: "Users",
      icon: "",
      onClick: () => {
        navigate("/users");
      },
    },
    {
      id: 3,
      title: "Food Menu",
      icon: "",
      onClick: () => {
        navigate("/products");
      },
    },
    {
      id: 4,
      title: "Table Management",
      icon: "",
      onClick: () => {
        navigate("/tables");
      },
      // type:['cashier', 'waiter']
    },
    {
      id: 5,
      title: "Orders",
      icon: "",
      onClick: () => {
        navigate("/order");
      },
      // type:['cashier', 'waiter']
    },
    {
      id: 6,
      title: "Payment",
      icon: "",
      onClick: () => {
        navigate("#");
      },
      // type:'cashier'
    },
  ];
  return (
    <>
    <div>
      <div className={styles.Container}>
        <div className={styles.Wrapper}>
        <a href="/" style={{
          cursor:"pointer",
          textDecoration:'none'
        }}>
          <div className={styles.ControlPanel}>
           
            <img src="/resturant.png" width={"50px"} height={"50px"}></img>
            <span>My Restro </span>
           
          </div>
          </a>
          <div className={styles.right}>
            <Profile />
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          width: "100%",
          // backgroundColor: "",
          height: "100%",
        }}
      >
        <div className={styles.sideBar}>
          <Titles data={data} />
        </div>

      </div>
    </div>
            <Outlet />
            </>
  );
}
