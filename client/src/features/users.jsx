import React, { useState } from "react";
import { useAllUsers } from "./react-query/users";
import { CiTrash } from "react-icons/ci";
import { RiPencilFill } from "react-icons/ri";
import AllDrawer from "../components/food-menu/Drawer";
import { useNavigate } from "react-router-dom";
import { removeUser } from "./react-query/users";
import DeleteModal from "../components/DeleteModal";
import { Button } from "@mui/material";

export const CustomButton = ({ type, id, onClick }) => {
  const navigate = useNavigate();
  const userString = localStorage.getItem("user") ?? null;
  let user = userString !== "undefined" ? JSON.parse(userString) : null;

  const isDisable = (userType) => {
    if (userType === "admin") {
      return false;
    } else {
      return true;
    }
  };
  switch (type) {
    case "edit":
      return (
        <Button
          style={{ cursor: "pointer", border: "none", color:'#007bff', display:'flex', alignItems:'center' }}
          onClick={() => navigate(`/editUser/${id}`)}
          disabled={isDisable(user?.userType)}
        >
          <RiPencilFill />
        </Button>
      );
    case "delete":
      return (
        <Button
          style={{ border: "none", cursor: "pointer", backgroundColor:'transparent', color:'#007bff' }}
          onClick={onClick}
          disabled={isDisable(user?.userType)}
        >
          <CiTrash />
        </Button>
      );
  }
};

function Users() {
  const { data, isError, isLoading } = useAllUsers();
  const [open, setOpen] = React.useState(false);
  const [openTableId, setOpenTableId] = React.useState(null)

  const handleOpen = (id) => {
    setOpen(true);
    setOpenTableId(id)
  };

  const handleClose = () => {
    setOpen(false);
    setOpenTableId(null)
  };

  const exceptAdmin = data?.filter((d) => d.userType !== "admin");

  if (isLoading) {
    return <h3>Loading ...</h3>;
  }


  const handleDelete = (id) => {
    setOpen(false);
    removeUser(id);
    alert("succesfully deleted user");
    window.location.reload();
  };
  return (
    <div
      style={{
        width: "76%",
        marginLeft: "21rem",
        padding: "20px",
        textAlign: "left",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems:'center' }}>
      <span style={{fontSize:'32px', lineHeight:'normal', fontWeight:700}}>User Management</span>
        {/* <UserDrawer /> */}
        <AllDrawer type={"user"} />
      </div>
      {exceptAdmin.length !== 0 ? (
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
              <th style={{ padding: "8px" }}>Name</th>

              <th style={{ padding: "8px" }}>Email</th>
              <th style={{ padding: "8px" }}>Role</th>
              <th style={{ padding: "8px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {exceptAdmin?.map((d, index) => (
              <tr key={index}>
                <td style={{ padding: "8px" }}>{index + 1}</td>
                <td style={{ padding: "8px" }}>
                  {d.firstName} {d.lastName}
                </td>
                <td style={{ padding: "8px" }}>{d.email}</td>
                <td style={{ padding: "8px" }}>{d.userType}</td>
                <td
                  style={{
                    padding: "8px",
                  }}
                >
                  <div
                    style={{ display: "flex", justifyContent: "space-evenly", alignItems:'center' }}
                  >
                    <CustomButton type="edit" id={d._id} />
                    {/* <Button type="delete" id={d._id} onClick={()=>handleDelete(d.email)} disable /> */}
                    {/* <Button type="delete" id={d._id} onClick={} disable /> */}
                    <DeleteModal
                      description={"Are you sure you want to delete the user ?"}
                      handleDelete={handleDelete}
                      id={d.email}
                      open={openTableId === d?._id}
                      handleOpen={()=>handleOpen(d?._id)}
                      handleClose={handleClose}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>'No active User'</p>
      )}
    </div>
  );
}

export default Users;
