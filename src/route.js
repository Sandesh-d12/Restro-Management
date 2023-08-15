import React from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/Nav-Bar";
import Details from "./components/profile/details";
import FoodMenu from "./features/FoodMenu";
import Dashboard from "./features/dashboard";
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
        <Route path="/foodMenu" element={<FoodMenu />} />
        <Route path="/profile" element={<Details />} />
      </Routes>
    </>
  );
}

export default AllRoute;
