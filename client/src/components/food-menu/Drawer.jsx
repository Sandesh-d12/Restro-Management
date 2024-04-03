import * as React from "react";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { SignUp } from "../../features/users/SignUp/SignUp";
import AddProduct from "../../features/product/AddProduct";
import { AddTable } from "../table-management/AddTable";
import PlaceOrder from "../../features/order/PlaceOrder";

export default function AllDrawer({ type, productId }) {
  const [state, setState] = React.useState({
    right: false,
  });
  const userString = localStorage.getItem("user") ?? null;
  let user = userString !== "undefined" ? JSON.parse(userString) : null;

  // const isDisable = (process, userType) => {
  //   if (userType === "admin") {
  //     return false;
  //   }if(process === 'order' || userType === 'waiter'){
  //     return true
  //   }else{
  //     return false;
  //   }
  //   //  else {
  //   //   return true;
  //   // }
  // };

  const isDisable = (process, userType) => {
    if (userType === "admin") {
      return false;
    } else if (process === 'order' && userType === 'waiter') {
      return false;
    } else if (process === 'order' && userType === 'cashier') {
      return true;
    } else {
      return false;
    }
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };
  const render = (type) => {
    switch (type) {
      case "user":
        return <SignUp />;
      case "product":
        return <AddProduct />;
      case "table":
        return <AddTable />;
      case "order":
        return <PlaceOrder productId={productId} />;
      case "default":
        break;
    }
  };

  return (
    <div>
      <React.Fragment>
        {
          type === 'order' && user.userType === 'cashier' ?
          <Button
          variant="outlined"
          onClick={toggleDrawer("right", true)}
          disabled={isDisable(user.userType, 'order')}
        >
          Add {type}
     
        </Button>
           :
           <Button
           variant="outlined"
           onClick={toggleDrawer("right", true)}
           disabled={isDisable(user?.userType)}
         >
           Add New {type}
      
         </Button>

           }
        <Drawer
          anchor={"right"}
          open={state["right"]}
          onClose={toggleDrawer("right", false)}
        >
          <div style={{ width: "300px", padding: "24px" }}>{render(type)}</div>
        </Drawer>
      </React.Fragment>
    </div>
  );
}
