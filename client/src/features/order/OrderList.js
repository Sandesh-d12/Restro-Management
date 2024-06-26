import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { removeOrder, useAllOrder } from "../react-query/order";
import DeleteModal from "../../components/DeleteModal";
import EditOrderModal from "../../components/EditOrderModal";
import { Box } from "@mui/material";



export default function OrderList() {
  const allOrder = useAllOrder();
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(true);
  const [openOrderId, setOpenOrderId] = useState(null);

  const handleOpen = (id) => {
    setOpen(true);
    setOpenOrderId(id);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenOrderId(null);
  };


  const handleDelete = (id) => {
    setOpen(false);
    removeOrder(id);
    alert("Successfully deleted order");
    window.location.reload();
  };

  const pendingOrder = allOrder && allOrder?.filter((item)=>item?.paymentDetails?.status === 'pending')
  return (
    <Box sx={{ width: '76%', marginLeft: '21rem', padding: '20px', textAlign: 'left', zIndex: 2 }}>
    <Typography variant="h4" fontWeight="700">Order Management</Typography>
    <Box sx={{ maxHeight: '800px', overflowY: 'auto', marginTop: '16px' }}>
      <table border={1} style={{ borderCollapse: 'collapse', border: '1px solid #ccc', width: '100%' }}>
        <thead style={{ backgroundColor: '#eee', position: 'sticky', top: 0, zIndex: 1 }}>
          <tr>
            <th style={{ padding: '18px', textAlign: 'left', width:'8%'  }}>S.N</th>
            <th style={{ padding: '18px', textAlign: 'left',width:'17%'  }}>Table Number</th>
            <th style={{ padding: '18px', textAlign: 'left', }}>Payment Type</th>
            <th style={{ padding: '18px', textAlign: 'left', }}>Order Status</th>
            <th style={{ padding: '18px', textAlign: 'left'  }}>Total Cost</th>
            <th style={{ padding: '18px', textAlign: 'left' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pendingOrder && pendingOrder.length > 0 ?
          (
            pendingOrder.slice().reverse().map((d, index) => (
              <React.Fragment key={d._id}>
                <tr>
                  <td colSpan={6}>
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon style={{ color: '#1976d2' }} />}
                        aria-controls={`panel${index + 1}-content`}
                        id={`panel${index + 1}-header`}
                      >
                        <Box sx={{ display: 'flex', width: '100%', justifyContent:'space-between', alignItems: 'center' }}>
                          <Typography sx={{ padding: '18px' }}>{index + 1}</Typography>
                          <Typography sx={{ padding: '18px' }}>{d?.table_number}</Typography>
                          <Typography sx={{ padding: '18px' }}>{d?.paymentDetails?.type}</Typography>
                          <Typography sx={{ padding: '18px' }}>{d?.paymentDetails?.status}</Typography>
                          <Typography sx={{ padding: '18px' }}>{d?.total_cost}</Typography>
                          <Box sx={{ display: 'flex', gap: '1rem', alignItems: 'center', padding: '18px' }}>
                            <EditOrderModal id={d._id} />
                            <DeleteModal
                              description={"Are you sure you want to delete the order?"}
                              handleDelete={handleDelete}
                              id={d._id}
                              open={openOrderId === d._id}
                              handleOpen={() => handleOpen(d._id)}
                              handleClose={handleClose}
                            />
                          </Box>
                        </Box>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Accordion>
                          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>Products</Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <table border={1} style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ccc' }}>
                              <thead>
                                <tr>
                                  <th style={{ padding: '18px' }}>Name</th>
                                  <th style={{ padding: '18px' }}>Category</th>
                                  <th style={{ padding: '18px' }}>Quantity</th>
                                  <th style={{ padding: '18px' }}>Unit Price</th>
                                </tr>
                              </thead>
                              {d?.product?.map((product, prodIndex) => (
                                <tbody key={prodIndex}>
                                  <tr>
                                    <td style={{ padding: '18px' }}>{product?.name}</td>
                                    <td style={{ padding: '18px' }}>{product?.category}</td>
                                    <td style={{ padding: '18px' }}>{product?.quantity}</td>
                                    <td style={{ padding: '18px' }}>{product?.price}</td>
                                  </tr>
                                </tbody>
                              ))}
                            </table>
                          </AccordionDetails>
                        </Accordion>
                      </AccordionDetails>
                    </Accordion>
                  </td>
                </tr>
              </React.Fragment>
            ))
          ):(
          <tr>
          <td colSpan={6}>
            <Typography>No Active Order Found</Typography>
          </td>
        </tr>)}
        </tbody>
      </table>
    </Box>
  </Box>
  );
}
