import React from "react";
import UsersList from "../components/users/usersList";

function Users() {
  return (
    <div
      style={{
        width: "70%",
        paddingLeft: "300px",
        paddingTop: "20px",
        textAlign: "left",
      }}
    >
      <span style={{ fontSize: "24px", fontWeight: 500 }}>
        Users Management
      </span>
      <UsersList />
    </div>
  );
}

export default Users;
