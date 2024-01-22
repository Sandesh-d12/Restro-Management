import React from "react";
import UsersList from "../components/users/usersList";
import { useAllUsers } from "./react-query/users";

function Users() {
  const { data, isError, isLoading } = useAllUsers();

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
      <UsersList data={data} />
    </div>
  );
}

export default Users;
