import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { SignUp } from '../../features/users/SignUp/SignUp';

export default function UserDrawer() {
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };


  return (
    <div>
      {/* {['left', 'right'].map((anchor) => ( */}
        <React.Fragment>
          <Button variant='outlined' onClick={toggleDrawer('right', true)}>Add New User</Button>
          <Drawer
            anchor={'right'}
            open={state['right']}
            onClose={toggleDrawer('right', false)}
          >
           <div style={{width:"300px",padding:"24px"}}>
           <SignUp />
           </div>
          </Drawer>
        </React.Fragment>
      {/* ))} */}
    </div>
  );
}