import React, { useState } from "react";
import Modal from "@mui/material/Modal";

export const useModal = (initialValue) => {
  const [open, setOpen] = useState(initialValue);

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  return { open, handleClose, handleOpen };
};

export function TableModal({ open, handleClose }) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div style={{ zIndex: 999 }}>
        <button onClick={handleClose}>
          <div>close</div>
        </button>
        <input type="text"></input>
      </div>
    </Modal>
  );
}
