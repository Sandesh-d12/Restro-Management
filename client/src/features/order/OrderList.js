// import React from 'react'
// import AllDrawer from '../../components/food-menu/Drawer'
// import { removeOrder, useAllOrder } from '../react-query/order'
// import { Button } from '../../components/table-management/Table'
// import DeleteModal from '../../components/DeleteModal'

// function OrderList() {
// const allOrder = useAllOrder()
// const [open, setOpen] = React.useState(false);

// const handleOpen = () => {
//   setOpen(true);
// };

// const handleClose = () => {
//   setOpen(false);
// };

// if(allOrder){
//   // return window.location.reload()
// }
// console.log(allOrder)
// const handleDelete = (id) => {
//   setOpen(false);
//   removeOrder(id)
//   alert("succesfully deleted user");
//   window.location.reload();
// };

//   return (
//     <>
//         <h1>Orders List</h1>
//     <div style={{marginLeft:"500px"}}>
        
//       {allOrder && allOrder?.length !== 0 ?
//       <table
//         border={1}
//         style={{
//           borderCollapse: "collapse",
//           border:'1px solid #ccc'
//         }}
//       >
//         <thead style={{backgroundColor:'#eee'}}>
//           <tr>
//             <th style={{ padding: "8px" }}>S.N</th>
//             <th style={{ padding: "8px" }}>Table Number</th>
          
//             <th style={{ padding: "8px" }}>Payment Type</th>
//             <th style={{ padding: "8px" }}>Order Status</th>
//             <th style={{ padding: "8px" }}>Quantity</th>
//             <th style={{ padding: "8px" }}>Product Name</th>
//             <th style={{ padding: "8px" }}>Price</th>
//             <th style={{ padding: "8px" }}>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {allOrder?.map((d, index) => (
//               <tr key={index}>
//                  <td style={{ padding: "8px" }}>{index + 1}</td>
//                 <td style={{ padding: "8px" }}>{d?.table_number}</td>
//                 <td style={{ padding: "8px" }}>{d?.paymentDetails?.type}</td>
//                 <td style={{ padding: "8px" }}>{d?.paymentDetails?.status}</td>
//                 {
//                   d?.product?.map((i, index)=>((
//                     <>
//                     <td style={{ padding: "8px" }}>{i?.name}</td>
//                     <td style={{ padding: "8px" }}>{i?.price}</td>
//                     <td style={{ padding: "8px" }}>{i?.quantity}</td>
//                     </>
//                   )))
//                 }
//                 <td
//                   style={{
//                     padding: "8px",
//                   }}
//                 >
//                   <div style={{width:"100px",display:"flex", justifyContent:"space-evenly"}}>
                
//                   <Button type="edit"  />
//                   <DeleteModal
//                       description={"Are you sure you want to delete?"}
//                       handleDelete={handleDelete}
//                       id={d._id}
//                       open={open}
//                       handleOpen={handleOpen}
//                       handleClose={handleClose}
//                     />
//                   </div>
//                 </td>
//               </tr>
//            ))}
//         </tbody>
//       </table>
//       :<p>No Orders Found</p>}
//     </div>
//     </>
//   )
// }

// export default OrderList


import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { removeOrder, useAllOrder } from '../react-query/order'
import DeleteModal from '../../components/DeleteModal'

export default function OrderList() {

  const allOrder = useAllOrder()
  const [open, setOpen] = React.useState(false);
  
  const handleOpen = () => {
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };
  
  if(allOrder){
    // return window.location.reload()
  }
  console.log(allOrder)
  const handleDelete = (id) => {
    setOpen(false);
    removeOrder(id)
    alert("succesfully deleted user");
    window.location.reload();
  };
  
  return (
    <div style={{width:'1000px', marginLeft:'30rem', marginTop:'2rem', border:'1px solid #ccc', textAlign:'left', padding:'32px'}}>
      <h1>Orders</h1>
      <table
        border={1}
        style={{
          borderCollapse: "collapse",
          border:'1px solid #ccc'
        }}
      >
        <thead style={{backgroundColor:'#eee'}}>
          <tr style={{display:'flex', gap:'10px'}}>
            <th style={{ padding: "18px" }}>S.N</th>
            <th style={{ padding: "18px" }}>Table Number</th>
          
            <th style={{ padding: "18px" }}>Payment Type</th>
            <th style={{ padding: "18px" }}>Order Status</th>
            <th style={{ padding: "18px" }}>Quantity</th>
            <th style={{ padding: "18px" }}>Product Name</th>
            <th style={{ padding: "18px" }}>Price</th>
            <th style={{ padding: "18px" }}>Actions</th>
          </tr>
        </thead>
        
      </table>
      {
       allOrder && allOrder.map((d, index)=>((
<Accordion>
        <AccordionSummary
          expandIcon={ <DeleteModal
            description={"Are you sure you want to delete?"}
            handleDelete={handleDelete}
            // id={d._id}
            open={open}
            handleOpen={handleOpen}
            handleClose={handleClose}
          />}
            aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography>Order {index + 1}</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <tbody>
   
              <tr key={index} style={{display:'flex', gap:'10px'}}>
                 <td style={{ padding: "18px" }}>{index + 1}</td>
                <td style={{ padding: "18px" }}>{d?.table_number}</td>
                <td style={{ padding: "18px" }}>{d?.paymentDetails?.type}</td>
                <td style={{ padding: "18px" }}>{d?.paymentDetails?.status}</td>
                {
                  d?.product?.map((i, index)=>((
                    <>
                    <td style={{ padding: "18px" }}>{i?.name}</td>
                    <td style={{ padding: "18px" }}>{i?.price}</td>
                    <td style={{ padding: "18px" }}>{i?.quantity}</td>
                    </>
                  )))
                }
                <td
                  style={{
                    padding: "8px",
                  }}
                >
                </td>
              </tr>
        </tbody>
        </AccordionDetails>

      </Accordion>
        )))
      }
      
    </div>
  );
}
