import React from "react";
import styles from "./styles/orders.module.css";
import Products from "../components/products";
import { useGetProducts } from "./react-query/products";
import { Button } from "@mui/material";
import ProductDrawer from "../components/food-menu/Drawer";

const Orders = () => {
  const { data } = useGetProducts();

  return (
    <div className={styles.wrapper}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "30%",
          alignItems: "center",
        }}
      >
        <h1>Available Items</h1>
       <ProductDrawer />
      </div>
      <div className={styles.card}>
        {data?.map((p, index) => (
          <Products
            key={index}
            Id={p?._id}
            title={p?.name}
            subHeader={p?.price}
            description={p?.quantity}
          />
        ))}
      </div>
    </div>
  );
};

export default Orders;
