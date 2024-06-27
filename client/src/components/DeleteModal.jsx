import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { CustomButton } from '../features/users';
import { CiTrash } from "react-icons/ci";
import { Button } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  // border: '1px solid #000',
  borderRadius:'8px',
  boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
  p: 4,
  display:'flex',
  flexDirection:'column',
  gap:'24px'
};

export default function DeleteModal({description, subDescription, id, handleDelete, handleOpen, open, handleClose, tableId, type}) {

  return (
    <div>
        <CustomButton type='delete' entity={type} onClick={()=>handleOpen(tableId)} ><CiTrash  /></CustomButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{display:'flex', flexDirection:'column', gap:'6px'}}>
          <Typography>
            {description}
          </Typography>
          <Typography>
            {subDescription}
          </Typography>
          </Box>
          <Box style={{display:"flex", justifyContent:'space-between'}}>
          <Button color='error' onClick={()=>handleDelete(id)}>Delete</Button>
          <Button onClick={handleClose}>Cancel</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
