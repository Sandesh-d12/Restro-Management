import { Box, Typography } from "@mui/material";
import React from "react";
import Table from "../components/table-management/table";

function TableManagement() {
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
      <Typography
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
      </Typography>
      {/* <Box
        sx={{
          // width: "70%",
          display: "flex",
          // padding: "40px",
          // //   alignItems: "center",
          // //   justifyContent: "center",
          // position: "relative",
          // marginLeft: "300px",
        }}
      > */}
      <Table />
      {/* </Box> */}
    </div>
  );
}

export default TableManagement;
