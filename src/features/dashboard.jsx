import React from "react";
import styles from "./styles/dashboard.module.css";
import LiveTable from "../components/Card";
import DashboardCard from "../components/dashboard/dashboardCard";
import { Box, Typography } from "@mui/material";

export default function Dashboard() {
  const data = [
    {
      id: 1,
      title: "Table1",
      icon: "",
      status: "booked",
    },
    {
      id: 2,
      title: "Table1",
      icon: "",
      status: "booked",
    },
    {
      id: 3,
      title: "Table1",
      icon: "",
      status: "booked",
    },
    {
      id: 4,
      title: "Table1",
      icon: "",
      status: "booked",
    },
    {
      id: 5,
      title: "Table1",
      icon: "",
      status: "booked",
    },
    {
      id: 6,
      title: "Table1",
      icon: "",
      status: "booked",
    },
    {
      id: 6,
      title: "Table1",
      icon: "",
      status: "booked",
    },
    {
      id: 6,
      title: "Table1",
      icon: "",
      status: "booked",
    },
    {
      id: 6,
      title: "Table1",
      icon: "",
      status: "booked",
    },
    {
      id: 6,
      title: "Table1",
      icon: "",
      status: "booked",
    },
    {
      id: 6,
      title: "Table1",
      icon: "",
      status: "booked",
    },
    {
      id: 6,
      title: "Table1",
      icon: "",
      status: "3 person",
    },
  ];
  const dashboardData = [
    { id: 1, title: "Today's Sale", number: "332" },
    { id: 2, title: "Yesterday's Sale", number: "332" },
    { id: 3, title: "Last 7 days Sale", number: "2323" },
    { id: 4, title: "All time sales", number: "23232323" },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography
        sx={{
          fontSize: "24px",
          textAlign: "left !important",
          marginLeft: "290px",
          marginTop: "20px",
        }}
      >
        Dashboard
      </Typography>
      <div className={styles.wrapper}>
        {" "}
        <div className={styles.dashboardCard}>
          {dashboardData.map((d) => (
            <DashboardCard title={d.title} number={d.number} />
          ))}
        </div>
        <div className={styles.container}>
          <div className={styles.text}> Live Table Status </div>
          <div className={styles.card}>
            {data.map((d) => (
              <LiveTable data={d} />
            ))}
          </div>
        </div>
      </div>
    </Box>
  );
}
