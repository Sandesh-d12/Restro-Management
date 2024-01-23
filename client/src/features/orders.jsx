import React from "react";
import styles from "./styles/orders.module.css";
import Products from "../components/products";
import { useGetProducts } from "./react-query/products";
import { Button } from "@mui/material";
import ProductDrawer from "../components/food-menu/Drawer";

const Orders = () => {
  const { data, isLoading } = useGetProducts();
  if(isLoading){
    return (
      <h3>Loading...</h3>
    )
  }

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
       <ProductDrawer type={'product'}/>
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
