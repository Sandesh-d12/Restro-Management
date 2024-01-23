import React from "react";
import UsersList from "../components/users/usersList";
import { useAllUsers } from "./react-query/users";
import { CiTrash } from "react-icons/ci";
import { FaEye } from "react-icons/fa";
import { RiPencilFill } from "react-icons/ri";
import UserDrawer from "../components/users/Drawer";

const Button = ({ type }) => {
  switch (type) {
    case "view":
      return <FaEye />;
    case "edit":
      return <RiPencilFill />;
    case "delete":
      return <CiTrash />;
  }
};

function Users() {
  const { data, isError, isLoading } = useAllUsers();
  if (isLoading) {
    return <h3>Loading ...</h3>;
  }
  return (
    <div
      style={{
        width: "70%",
        paddingLeft: "300px",
        paddingTop: "20px",
        textAlign: "left",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <div style={{display:"flex", justifyContent:"space-between"}}>
      <span style={{ fontSize: "24px", fontWeight: 500 }}>
        Users Management
      </span>
      <UserDrawer />
      </div>
      <table
        border={1}
        style={{
          borderCollapse: "collapse",
          border:'1px solid #ccc'
        }}
      >
        <thead style={{backgroundColor:'#eee'}}>
          <tr>
            <th style={{ padding: "8px" }}>S.N</th>
            <th style={{ padding: "8px" }}>Name</th>
          
            <th style={{ padding: "8px" }}>Email</th>
            <th style={{ padding: "8px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d, index) => (
            <>
              <tr>
                <td style={{ padding: "8px" }}>{index + 1}</td>
                <td style={{ padding: "8px" }}>{d.firstName} {d.lastName}</td>
                <td style={{ padding: "8px" }}>{d.email}</td>
                <td
                  style={{
                    padding: "8px",
                  }}
                >
                  <div style={{display:"flex", justifyContent:"space-between"}}>
                  <Button type="view" />
                  <Button type="edit" />
                  <Button type="delete" />
                  </div>
                </td>
              </tr>
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users;
