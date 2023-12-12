import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import * as React from "react";

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
          <Typography variant="body2" sx={{ textAlign: "center" }}>
            {/* <i class="fa fa-folder-open" aria-hidden="true"></i> */}
            <img
              src="/number.png"
              width="50px"
              height={"50px"}
              style={{ marginTop: "7px" }}
            />
          </Typography>
        </div>
      </Box>
    </Card>
  );
}
