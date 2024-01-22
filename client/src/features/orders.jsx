import React from "react";
import styles from "./styles/orders.module.css";
import Products from "../components/products";
import { useGetProducts } from "./react-query/products";
import { Button } from "@mui/material";

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
        <Button variant="outlined" style={{ padding: "12px" }}>
          Add Items
        </Button>
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
