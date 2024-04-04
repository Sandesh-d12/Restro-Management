import * as React from "react";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import PlaceOrder from "../features/order/PlaceOrder";
import { useAllTable } from "../features/react-query/table";

export default function OrderDrawer({productId}) {
  const [state, setState] = React.useState({
    right: false,
  });
  const { data, isError, isLoading } = useAllTable();
  const userString = localStorage.getItem("user") ?? null;
  let user = userString !== "undefined" ? JSON.parse(userString) : null;
// console.log(data)
const tableNumbers = data && data?.map(d => d.tableNumber);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };
 

  return (
    <div>
      <React.Fragment>
        {user.userType === 'cashier' ?
            <Button
            variant="outlined"
            onClick={toggleDrawer("right", true)}
            disabled={true}
          >
            Place Order
       
          </Button>
          :
           <Button
           variant="outlined"
           onClick={toggleDrawer("right", true)}
           disabled={false}
         >
          Place Order
      
         </Button>

           }
        <Drawer
          anchor={"right"}
          open={state["right"]}
          onClose={toggleDrawer("right", false)}
        >
          <div style={{ width: "300px", padding: "24px" }}> <PlaceOrder tableNumber={tableNumbers} productId={productId} />;</div>
        </Drawer>
      </React.Fragment>
    </div>
  );
}
