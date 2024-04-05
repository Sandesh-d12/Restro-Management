

import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";


export default function liveTable({ data }) {

  return (
    <Card
      sx={{
        width: "150px",
        alignItems: "center",
        padding: "10px",
        minHeight: "60px",
        backgroundColor: data.occupancy == data.tableCapacity ? "#36b9cc" : "white",
        display: "flex",
      }}
    >
      <Box
        style={{
          display: "flex",
          gap: "20px",
          alignItems: "space-between",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <div>
          <Typography
            sx={{
              fontSize: 14,
              fontWeight: 600,
              lineHeight: "14px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
            color="text.secondary"
            gutterBottom
          >
           table {data.tableNumber}
          </Typography>
          <div>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {data.occupancy}/{data.tableCapacity}
            </Typography>
       
          </div>
        </div>
      </Box>
    </Card>
  );
}
