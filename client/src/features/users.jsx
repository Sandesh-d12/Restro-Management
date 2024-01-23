import React from "react";
import { useAllUsers } from "./react-query/users";
import { CiTrash } from "react-icons/ci";
import { RiPencilFill } from "react-icons/ri";
import AllDrawer from "../components/food-menu/Drawer";
import { useNavigate } from "react-router-dom";

const Button = ({ type,id }) => {
  const navigate = useNavigate();
  switch (type) {
    case "edit":
      return <button style={{cursor:"pointer", backgroundColor:'#fff', border:"none"}} onClick={()=>navigate(`/editUser/${id}`)}><RiPencilFill /></button>
    case "delete":
      return <CiTrash />;
  }
};

function Users() {
  const { data, isError, isLoading } = useAllUsers();

  if (isLoading) {
    return <h3>Loading ...</h3>;
  }

  const handleEdit = (e) => {
    const v = e.target.value
    console.log(v)
    // navigate(`/editUser/${id}`)
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
      {/* <UserDrawer /> */}
      <AllDrawer type={'user'} />
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
              <tr key={index}>
                <td style={{ padding: "8px" }}>{index + 1}</td>
                <td style={{ padding: "8px" }}>{d.firstName} {d.lastName}</td>
                <td style={{ padding: "8px" }}>{d.email}</td>
                <td
                  style={{
                    padding: "8px",
                  }}
                >
                  <div style={{display:"flex", justifyContent:"space-evenly"}}>
                
                  <Button type="edit" id={d._id} />
                  <Button type="delete" />
                  </div>
                </td>
              </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users;
