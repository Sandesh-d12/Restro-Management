import React from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/Nav-Bar";
import Details from "./components/profile/details";
import FoodMenu from "./features/FoodMenu";
import Dashboard from "./features/dashboard";
import Orders from "./features/orders";
import TableManagement from "./features/table-management";
import Users from "./features/users";
import { SignUp } from "./features/users/SignUp/SignUp";
import { LogIn } from "./features/users/logIn/LogIn";

function AllRoute() {
  const userString = localStorage.getItem("user") ?? null;
  // console.log("route", userString);
  let user = userString !== "undefined" ? JSON.parse(userString) : null;

  return (
    <Routes>
      {user && (
        <>
          <Route element={<NavBar />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/tables" element={<TableManagement />} />
            <Route path="/users" element={<Users />} />
            <Route path="/foodMenu" element={<FoodMenu />} />
            <Route path="/profile" element={<Details />} />
            <Route path="*" element={<Dashboard />} />
          </Route>
        </>
      )}{" "}
      {!user && (
        <>
          <Route path="/" element={<LogIn />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="*" element={<LogIn />} />
        </>
      )}
    </Routes>
  );
}

export default AllRoute;
