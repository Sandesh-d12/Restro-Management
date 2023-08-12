import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./features/dashboard";
import NavBar from "./components/Nav-Bar";
import Orders from "./features/orders";
import TableManagement from "./features/table-management";
import Users from "./features/users";

function AllRoute() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route index element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/tables" element={<TableManagement />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </>
  );
}

export default AllRoute;
