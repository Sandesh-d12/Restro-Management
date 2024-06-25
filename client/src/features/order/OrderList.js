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
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

const Info = ()=> {
  return (
    <Tooltip title="Expand to see the product list">
      <IconButton>
   <div style={{height:'auto', width:'25px',display:'felx',alignItems:'center', justifyContent:'center', background:'#69bdfa', borderRadius:'50%'}}><span style={{fontSize:'16px', fontStyle:'Work Sans'}}>i</span></div>
      </IconButton>
    </Tooltip>
  );
}

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

  const label = { inputProps: { "aria-label": "Switch demo" } };

  return (
    <div
      style={{
        maxWidth: "1500px",
        marginLeft: "18rem",
        marginTop: "2rem",
        textAlign: "left",
        zIndex: 2,
        padding: "0px 32px 0px 32px",
      }}
    >
      <h1>Orders</h1>
      <div style={{ maxHeight: "800px", overflowY: "auto" }}>
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
              <th style={{ padding: "18px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {allOrder &&
              allOrder
                .slice()
                .reverse()
                .map((d, index) => (
                  <React.Fragment key={d._id}>
                    <tr>
                      <td colSpan={5}>
                        <Accordion>
                          <AccordionSummary
                            expandIcon={
                              <ExpandMoreIcon style={{ paddingLeft: "1rem" }} />
                            }
                            aria-controls={`panel${index + 1}-content`}
                            id={`panel${index + 1}-header`}
                          >
                            <div
                              style={{
                                display: "flex",
                                width: "100%",
                                justifyContent: "space-between",
                                zIndex: 0,
                              }}
                            >
                              <Typography>Order {index + 1}</Typography>
                              <Typography>{d?.table_number}</Typography>
                              <Typography>{d?.paymentDetails?.type}</Typography>
                              <Typography>
                                {d?.paymentDetails?.status}
                              </Typography>
                              <div
                                style={{
                                  display: "flex",
                                  gap: "1rem",
                                  alignItems: "center",
                                }}
                              >
                                {/* <Info /> */}
                                <Switch
                                  {...label}
                                  checked={checked}
                                  onChange={handleChange}
                                />
                                <EditOrderModal id={d._id} />
                                <DeleteModal
                                  description={
                                    "Are you sure you want to delete?"
                                  }
                                  handleDelete={handleDelete}
                                  id={d._id}
                                  open={openOrderId === d._id}
                                  handleOpen={() => handleOpen(d._id)}
                                  handleClose={handleClose}
                                />
                              </div>
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
                                  style={{
                                    width: "100%",
                                    borderCollapse: "collapse",
                                    border: "1px solid #ccc",
                                  }}
                                >
                                  <thead>
                                    <th style={{ padding: "18px" }}>Name</th>
                                    <th style={{ padding: "18px" }}>
                                      Category
                                    </th>
                                    <th style={{ padding: "18px" }}>
                                      Quantity
                                    </th>
                                    <th style={{ padding: "18px" }}>Price</th>
                                  </thead>
                                  {d?.product?.map((product, prodIndex) => (
                                    <tbody key={prodIndex}>
                                      <tr>
                                        <td style={{ padding: "18px" }}>
                                          {product?.name}
                                        </td>
                                        <td style={{ padding: "18px" }}>
                                          {product?.category}
                                        </td>
                                        <td style={{ padding: "18px" }}>
                                          {product?.quantity}
                                        </td>
                                        <td style={{ padding: "18px" }}>
                                          {product?.price}
                                        </td>
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
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
