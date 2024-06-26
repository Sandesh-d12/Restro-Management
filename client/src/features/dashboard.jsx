import { Box, Typography } from "@mui/material";
import React from "react";
import LiveTable from "../components/TableCard.jsx";
import styles from "./styles/dashboard.module.css";
import { useAllTable } from "./react-query/table.js";
import RecentOrder from "../components/dashboard/RecentOrder.jsx";

export default function Dashboard() {
  const { data } = useAllTable();

  return (
    <div className={styles.wrapper}>
      <div style={{ marginBottom: "40px" }}>
        <span
          style={{ fontSize: "32px", lineHeight: "normal", fontWeight: 700 }}
        >
          Dashboard
        </span>
      </div>
      <div className={styles.container}>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <span
            style={{ fontSize: "28px", lineHeight: "normal", fontWeight: 500 }}
          >
            Live Table Status
          </span>
          <a href="/tables" style={{ textDecoration: "none", width: "190px" }}>
            <span color="blue">Take a look at all tables</span>
          </a>
          .
        </div>
        <div className={styles.card}>
          {data && data?.length !== 0 ? (
            data?.map((d, index) => <LiveTable data={d} key={index} />)
          ) : (
            <p>No table found</p>
          )}
        </div>
        <RecentOrder />
      </div>
  
   
    </div>
  );
}
