import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { SignUp } from '../../features/users/SignUp/SignUp';
import  {AddProduct}  from '../../features/product/AddProduct';


export default function AllDrawer({type}) {
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };
  const render = (type) => {
switch(type){
    case 'user':
        return(
            <SignUp />
        )
        case 'product':
            return(
                <AddProduct />
            )
            case 'default':
                break;
}
  }


  return (
    <div>
        <React.Fragment>
          <Button variant='outlined' onClick={toggleDrawer('right', true)}>Add New {type}</Button>
          <Drawer
            anchor={'right'}
            open={state['right']}
            onClose={toggleDrawer('right', false)}
          >
           <div style={{width:"300px",padding:"24px"}}>
          {render(type)}
           </div>
          </Drawer>
        </React.Fragment>
    </div>
  );
}