import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Switch from "@mui/material/Switch";
import { removeOrder, useAllOrder } from "../react-query/order";
import { RiFileUnknowFill } from "react-icons/ri";
import DeleteModal from "../../components/DeleteModal";
import EditOrderModal from "../../components/EditOrderModal";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

export default function ArchivedOrder() {
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

  const handleChange = () => {
    setChecked((prev) => !prev);
    const payload = checked ? "received" : "pending";
  };

  const handleDelete = (id) => {
    setOpen(false);
    removeOrder(id);
    alert("Successfully deleted order");
    window.location.reload();
  };

  const pendingOrder = allOrder && allOrder?.filter((item)=>item?.paymentDetails?.status === 'paid')
  return (
    <div
      style={{
        width: "76%",
        marginLeft: "21rem",
        padding: "20px",
        textAlign: "left",
        zIndex: 2,
      }}
    >
      <span style={{ fontSize: "32px", lineHeight: "normal", fontWeight: 700 }}>
       Archieved Orders
      </span>
      <div style={{ maxHeight: "800px", overflowY: "auto", marginTop: "16px" }}>
        <table
          border={1}
          style={{
            borderCollapse: "collapse",
            border: "1px solid #ccc",
            width: "100%",
          }}
        >
          <thead
            style={{
              backgroundColor: "#eee",
              position: "sticky",
              top: 0,
              zIndex: 1,
            }}
          >
            <tr>
              <th style={{ padding: "18px" }}>S.N</th>
              <th style={{ padding: "18px" }}>Table Number</th>
              <th style={{ padding: "18px" }}>Payment Type</th>
              <th style={{ padding: "18px" }}>Order Status</th>
              <th style={{ padding: "18px" }}>Total Cost</th>
            </tr>
          </thead>
          <tbody>
          {pendingOrder && pendingOrder.length > 0 ? (
    pendingOrder
      .slice()
      .reverse()
      .map((d, index) => (
        <React.Fragment key={d._id}>
          <tr>
            <td colSpan={6}>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon style={{ paddingLeft: '1rem', color: '#1976d2' }} />}
                  aria-controls={`panel${index + 1}-content`}
                  id={`panel${index + 1}-header`}
                >
                  <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', zIndex: 0 }}>
                    <Typography>Order {index + 1}</Typography>
                    <Typography>{d?.table_number}</Typography>
                    <Typography>{d?.paymentDetails?.type}</Typography>
                    <Typography>{d?.paymentDetails?.status}</Typography>
                    <Typography>{d?.total_cost}</Typography>
                  </div>
                </AccordionSummary>
                <AccordionDetails>
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography>Products</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <table
                        border={1}
                        style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ccc' }}
                      >
                        <thead>
                          <tr>
                            <th style={{ padding: '18px' }}>Name</th>
                            <th style={{ padding: '18px' }}>Category</th>
                            <th style={{ padding: '18px' }}>Quantity</th>
                            <th style={{ padding: '18px' }}>Unit Price</th>
                          </tr>
                        </thead>
                        <tbody>
                          {d?.product?.map((product, prodIndex) => (
                            <tr key={prodIndex}>
                              <td style={{ padding: '18px' }}>{product?.name}</td>
                              <td style={{ padding: '18px' }}>{product?.category}</td>
                              <td style={{ padding: '18px' }}>{product?.quantity}</td>
                              <td style={{ padding: '18px' }}>{product?.price}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </AccordionDetails>
                  </Accordion>
                </AccordionDetails>
              </Accordion>
            </td>
          </tr>
        </React.Fragment>
      ))
  ) : (
    <tr>
      <td colSpan={6}>
        <Typography>No Archived Order Found</Typography>
      </td>
    </tr>
  )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
