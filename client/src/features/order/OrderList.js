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
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Button } from '../../components/table-management/Table'
import EditOrderModal from '../../components/EditOrderModal';
import Switch from '@mui/material/Switch';

const Line = () => {
  return (
    <div style={{
      height:'100px',
      border:'1px solid #ccc',
      marginLeft:'30px'
    }}>

    </div>
  )
}

export default function OrderList() {

  const allOrder = useAllOrder()
  const [open, setOpen] = React.useState(false);
  const [checked, setChecked] = React.useState(true);
  const [openOrderId, setOpenOrderId] = React.useState(null);
  
  const handleOpen = (id) => {
    setOpen(true);
    setOpenOrderId(id);
  };
  
  const handleClose = () => {
    setOpen(false);
    setOpenOrderId(null);
  };

  const handleChange = () => {

    setChecked((prev) => !prev);

 
    const payload = checked ? 'received' : 'pending';

    
    console.log(payload);

  };
  
  if(allOrder){
    // return window.location.reload()
  }
  console.log(allOrder)
  const handleDelete = (id) => {
    setOpen(false);
    removeOrder(id)
    alert("succesfully deleted user");
    // window.location.reload();
  };

  const label = { inputProps: { 'aria-label': 'Switch demo' } };
  
  return (
    <div style={{maxWidth:'1500px',width:'100%', marginLeft:'18rem', marginTop:'2rem', textAlign:'left', padding:'0px 32px 0px 32px'}}>
      <h1>Orders</h1>
      <table
        border={1}
        style={{
          borderCollapse: "collapse",
          border:'1px solid #ccc',
          maxWidth:'1500px',width:'100%',
        }}
      >
        <thead style={{backgroundColor:'#eee'}}>

            <th style={{ padding: "18px" }}>S.N</th>
            <th style={{ padding: "18px" }}>Table Number</th>
          
            <th style={{ padding: "18px" }}>Payment Type</th>
            <th style={{ padding: "18px" }}>Order Status</th>
            <th style={{ padding: "18px" }}>Quantity</th>
            <th style={{ padding: "18px" }}>Product Name</th>
            <th style={{ padding: "18px" }}>Price</th>
            <th style={{ padding: "18px" }}>Actions</th>
        </thead>
        
      </table>
      {
       allOrder && allOrder.map((d, index)=>((
<Accordion>
        <AccordionSummary
          expandIcon={ <ExpandMoreIcon style={{paddingLeft:'1rem'}}/>}
            aria-controls="panel1-content"
          id="panel1-header"
        >
          <div style={{display:'flex',width:'100%', justifyContent:'space-between', zIndex:1}}>
          <Typography>Order {index + 1}</Typography>
          <div style={{display:'flex', gap:'1rem'}}>
          <Switch {...label}   checked={checked}
      onChange={handleChange} />
        <EditOrderModal id={d._id} />
          <DeleteModal
            description={"Are you sure you want to delete?"}
            handleDelete={handleDelete}
            id={d._id}
            open={openOrderId === d._id}
            handleOpen={()=>handleOpen(d._id)}
            handleClose={handleClose}
          />
          </div>
          </div>
        </AccordionSummary>
        <AccordionDetails>
        <tbody>
   
              <tr key={index} style={{display:'flex', gap:'10px'}}>
                 <td style={{ padding: "18px" }}>{index + 1}</td>
                 <Line />
                <td style={{ padding: "18px" }}>{d?.table_number}</td>
                <Line />
                <td style={{ padding: "18px" }}>{d?.paymentDetails?.type}</td>
                <Line />
                <td style={{ padding: "18px" }}>{d?.paymentDetails?.status}</td>
                <Line />
                {
                  d?.product?.map((i, index)=>((
                    <>
                    <td style={{ padding: "18px" }}>{i?.name}</td>
                    <Line />
                    <td style={{ padding: "18px" }}>{i?.price}</td>
                    <Line />
                    <td style={{ padding: "18px" }}>{i?.quantity}</td>
                    <Line />
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
