import React, { useState } from "react";
import { CiTrash } from "react-icons/ci";
import { RiPencilFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useAllTable } from "../../features/react-query/table";
import AllDrawer from "../food-menu/Drawer";
import toast from "react-hot-toast";

export const Button = ({ type,id, onClick }) => {
  const navigate = useNavigate();
  switch (type) {
    case "edit":
      return <button style={{cursor:"pointer", backgroundColor:'#fff', border:"none"}} onClick={()=>navigate('#')}><RiPencilFill /></button>
    case "delete":
      return <button style={{border:'none', backgroundColor:'#fff', cursor:'pointer'}} onClick={onClick}><CiTrash  /></button>
  }
};

function Table() {
  const { data, isError, isLoading, isSuccess } = useAllTable();


  if (isLoading) {
    return <h3>Loading ...</h3>;
  }

  const handleEdit = (e) => {

  }

  const handleDelete = (id) =>{

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
      <AllDrawer type={'table'} />
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
                <td style={{ padding: "8px" }}>{d.tableNumber}</td>
                <td style={{ padding: "8px" }}>{d.tableCapacity}</td>
                <td style={{ padding: "8px" }}>{d.occupancy}</td>
                <td
                  style={{
                    padding: "8px",
                  }}
                >
                  <div style={{display:"flex", justifyContent:"space-evenly"}}>
                
                  <Button type="edit" id={d._id} />
                  <Button type="delete" id={d._id} onClick={()=>handleDelete(d.email)}/>
                  </div>
                </td>
              </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table
