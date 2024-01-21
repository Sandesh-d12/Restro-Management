import styled from "@emotion/styled";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import * as React from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const StyledButton = styled.button`
  padding: 10px 10px;
  border: none;
  cursor: pointer;
  background-color: #36b9cc;
  color: white;
  font-size: 14px;
  border-radius: 4px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2a8aae;
  }
`;

export default function PlaceOrderModal({ open, handleClose }) {
  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Edit Items"}</DialogTitle>
        <div style={{ border: "1px solid rgb(207 201 201)" }}></div>
        <div
          style={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
            justifyContent: "left",
            flexWrap: "wrap",
            paddingTop: "15px",
            paddingLeft: "15px",
          }}
        >
          <TextField id="category" label="Category" variant="outlined" />
          <TextField id="name" label="Name" variant="outlined" />
          <TextField id="quantity" label="Quantity" variant="outlined" />
        </div>
        <DialogActions>
          <StyledButton onClick={handleClose}>Edit Items</StyledButton>
          <Button color="error" variant="contained" onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
