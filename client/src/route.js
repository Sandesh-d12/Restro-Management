import React from "react";
import { Route, Routes, Outlet } from "react-router-dom";
import NavBar from "./components/Nav-Bar";
import Details from "./components/profile/details";
import FoodMenu from "./features/FoodMenu";
import Dashboard from "./features/Dashboard";
import AllProducts from "./features/Products";
import TableManagement from "./features/table-management";
import Users from "./features/users";
import { SignUp } from "./features/users/SignUp/SignUp";
import { LogIn } from "./features/users/logIn/LogIn";
import EditUsers from "./features/users/edit/EditUsers";
import PlaceOrder from "./features/order/PlaceOrder";
import OrderList from "./features/order/OrderList";
import ArchivedOrder from "./features/order/ArchivedOrders";
import {ForbiddenPage} from '../src/features/forbiddenPage/ForbiddenPage'


function AllRoute() {
  const userString = localStorage.getItem("user") ?? null;
  let user = userString !== "undefined" ? JSON.parse(userString) : null;

  return (
    <Routes>
      {user && (
        <Route element={<NavBar />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/products/:category" element={<AllProducts />} />
          <Route path="/menu" element={<FoodMenu />} />
          <Route path="/tables" element={<TableManagement />} />
          <Route path="/users" element={<Users />} />
          <Route path="/foodMenu" element={<FoodMenu />} />
          <Route path="/profile" element={<Details />} />
          <Route path="/editUser/:id" element={<EditUsers />} />
          <Route path='/order' element={<OrderList />} />
          <Route path='/archived-order' element={<ArchivedOrder />} />
          <Route path="*" element={<Dashboard />} />
        </Route>
      )}
      {(!user || user == null )&& (
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