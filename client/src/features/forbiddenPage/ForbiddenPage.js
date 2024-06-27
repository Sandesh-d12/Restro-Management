import { Typography } from "@mui/material";
import React from "react";

export const ForbiddenPage = () => {
  return (
    <div style={{display:'flex', alignItems:'center', justifyContent:'center', paddingTop:'56px' }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems:'center', gap:'24px' }}>
        <img src="forbidden.svg" width={'96px'} height={'auto'} />
      
      <Typography fontSize={"24px"} fontWeight={500}>
        You have come across forbidden page...
      </Typography>
      </div>
    </div>
  );
};
