import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";

export default function DashboardCard({ title, number }) {
  return (
    <Card
      sx={{
        width: "23%",
        alignItems: "center",
        padding: "10px",
        minHeight: "70px",
      }}
    >
      <Box
        style={{
          display: "flex",
          gap: "20px",
          alignItems: "space-between",
          justifyContent: "space-between",
        }}
      >
        <div>
          <Typography
            sx={{ fontSize: 14, fontWeight: 600, lineHeight: "14px" }}
            color="text.secondary"
            gutterBottom
          >
            {title}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {number}
          </Typography>
        </div>
        <div>
          <Typography variant="body2">
            {/* <i class="fa fa-folder-open" aria-hidden="true"></i> */}
            <img src="/file.png" width="50px" height={"50px"} />
          </Typography>
        </div>
      </Box>
    </Card>
  );
}
