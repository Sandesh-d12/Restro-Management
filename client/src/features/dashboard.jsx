import { Box, Typography } from "@mui/material";
import React from "react";
import LiveTable from "../components/TableCard.jsx";
import styles from "./styles/dashboard.module.css";
import { useAllTable } from "./react-query/table.js";
import RecentOrder from "../components/dashboard/RecentOrder.jsx";

export default function Dashboard() {

  const {data} = useAllTable()

  return (

      <div className={styles.wrapper}>
        <span style={{fontSize:'32px', lineHeight:'normal', fontWeight:700}}>Dashboard</span>
        <div className={styles.container}>
          <div className={styles.text}> Live Table Status </div>
          <div className={styles.card}>
            {data && data?.length !== 0 ? data?.map((d, index) => (
              <LiveTable data={d} key={index} />
            )) : <p>No table found</p>}
          </div>
        </div>
        <div>
       
        </div>
        <RecentOrder />
      </div>

  );
}
