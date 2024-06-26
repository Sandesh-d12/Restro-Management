import React, { useState } from "react";
import { CiTrash } from "react-icons/ci";
import { RiPencilFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { removeTable, useAllTable } from "../../features/react-query/table";
import AllDrawer from "../food-menu/Drawer";
import DeleteModal from "../DeleteModal";
import EditTableModal from "../EditTableModal";
import { Button } from "@mui/material";

export const CustomButton = ({ type, id, onClick }) => {
  const navigate = useNavigate();
  switch (type) {
    case "edit":
      return (
        <Button
          style={{ cursor: "pointer", border: "none" }}
        onClick={onClick}
        >
          <RiPencilFill />
        </Button>
      );
    case "delete":
      return (
        <Button
          style={{ border: "none", cursor: "pointer", backgroundColor:'transparent' }}
          onClick={onClick}
          variant="outlined"
        >
          <CiTrash />
        </Button>
      );
  }
};

function Table() {
  const { data, isError, isLoading, isSuccess } = useAllTable();
  const [open, setOpen] = React.useState(false);

  const [openTableId, setOpenTableId] = useState(null);

  const handleOpen = (id) => {
    setOpen(true);
    setOpenTableId(id);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenTableId(null);
  };

  if (isLoading) {
    return <h3>Loading ...</h3>;
  }


  const handleDelete = (id) => {
    setOpen(false);
    removeTable(id);
    alert("succesfully deleted table");
    // window.location.reload();
  };
  return (
    <div
      style={{
        width: "76%",
        padding: "20px",
        marginLeft: "21rem",
        textAlign: "left",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
      <span style={{fontSize:'32px', lineHeight:'normal', fontWeight:700}}>Table Management</span>
        <AllDrawer type={"table"} />
      
      </div>
      <table
        border={1}
        style={{
          borderCollapse: "collapse",
          border: "1px solid #ccc",
        }}
      >
        <thead style={{ backgroundColor: "#eee" }}>
          <tr>
            <th style={{ padding: "8px" }}>S.N</th>
            <th style={{ padding: "8px" }}>Table Number</th>

            <th style={{ padding: "8px" }}>Table Capacity</th>
            <th style={{ padding: "8px" }}>Occupied</th>
            <th style={{ padding: "8px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((d, index) => (
            <tr key={index}>
              <td style={{ padding: "8px" }}>{index + 1}</td>
              <td style={{ padding: "8px" }}>{d?.tableNumber}</td>
              <td style={{ padding: "8px" }}>{d?.tableCapacity}</td>
              <td style={{ padding: "8px" }}>{d?.occupancy}</td>
              <td
                style={{
                  padding: "8px",
                }}
              >
                <div
                  style={{ display: "flex", justifyContent: "space-evenly" }}
                >
               <EditTableModal id={d._id} />
                  {(
                    <DeleteModal
                      description={'Are you sure you want to delete this table?'}
                      id={d?.tableNumber}
                      tableId={d._id}
                      handleDelete={() => handleDelete(d._id)}
                      open={openTableId === d._id}
                      handleClose={handleClose}
                      handleOpen={handleOpen}
                    />
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
