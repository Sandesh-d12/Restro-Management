import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Titles from "./Titles";
import Profile from "./profile/Avatar";
import styles from "./styles/navBar.module.css";
import { Outlet } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname; 

  const data = [
    {
      id: 1,
      title: "Dashboard",
      icon: "",
      path: "/dashboard",
    },
    {
      id: 2,
      title: "Users",
      icon: "",
      path: "/users",

    },
    {
      id: 3,
      title: "Food Menu",
      icon: "",
      path: "/menu",

    },
    {
      id: 4,
      title: "Table Management",
      icon: "",
      path: "/tables",
    },
    {
      id: 5,
      title: "Orders",
      icon: "",
      path: "/order",
   
    },
    {
      id: 6,
      title: "Payment",
      icon: "",
      path: "#",
   
    },
  ];

  const handleClick = (path) => {
    navigate(path);
  };

  return (
    <>
      <div>
        <div className={styles.Container}>
          <div className={styles.Wrapper}>
            <a
              href="/"
              style={{
                cursor: "pointer",
                textDecoration: "none",
              }}
            >
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
            height: "100%",
          }}
        >
          <div className={styles.sideBar}>
            {data?.map((item) => (
              <Titles
              key={item.id}
                title={item.title}
                id={item.id}
                active={path == item?.path}
                handleClick={() => handleClick(item?.path)}
              />
            ))}
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
}
