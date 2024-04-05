import { Box, Button, Typography } from "@mui/material";
import React from "react";
import Table from "../components/table-management/Table";
import AllDrawer from "../components/food-menu/Drawer";

function TableManagement() {
  const [open, setOpen] = React.useState(false)
  return (
    <div
      style={{
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        width: "100%",
      }}
    >
      {/* <Typography
        sx={{
          textAlign: "left",
          // paddingLeft: "300px",
          marginTop: "20px",
          marginBottom: "15px",
          fontSize: "24px",
          fontWeight: 500,
        }}
      >
        Table Management
      </Typography> */}
      <h1>Table Management</h1>
      <Table />
    </div>
  );
}

export default TableManagement;
