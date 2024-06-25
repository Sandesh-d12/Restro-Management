import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { CustomButton } from '../features/users';
import { CiTrash } from "react-icons/ci";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display:'flex',
  flexDirection:'column',
  gap:'24px'
};

export default function DeleteModal({description, id, handleDelete, handleOpen, open, handleClose, tableId}) {

  return (
    <div>
        <CustomButton type='delete' style={{border:'none', backgroundColor:'#fff', cursor:'pointer'}} onClick={()=>handleOpen(tableId)} ><CiTrash  /></CustomButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography>
            {description}
          </Typography>
          <Box style={{display:"flex", justifyContent:'space-between'}}>
          <button onClick={()=>handleDelete(id)}>Delete</button>
          <button onClick={handleClose}>Cancel</button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
