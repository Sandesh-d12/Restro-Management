import React from "react";
import styles from "./styles/orders.module.css";
import Products from "../components/products";
import PlaceOrderModal from "../components/orderModal";

const Product = [
  {
    id: 1,
    title: "Pizza",
    subHeader: "ee",
    description: "ssss",
    icon: "",
    onClick: () => {},
  },
  {
    id: 2,
    title: "Momo",
    subHeader: "ee",
    description: "ssss",
    icon: "",
    onClick: () => {},
  },
  {
    id: 3,
    title: "Chowmin",
    subHeader: "ee",
    description: "ssss",
    icon: "",
    onClick: () => {},
  },
  {
    id: 4,
    title: "Samosa",
    subHeader: "ee",
    description: "ssss",
    icon: "",
    onClick: () => {},
  },
  {
    id: 5,
    title: "Fries",
    subHeader: "ee",
    description: "ssss",
    icon: "",
    onClick: () => {},
  },
  {
    id: 6,
    title: "Thukpa",
    subHeader: "ee",
    description: "ssss",
    icon: "",
    onClick: () => {},
  },
];

const Orders = () => {
  return (
    <div className={styles.wrapper}>
      <h1>Available Items</h1>
      <div className={styles.card}>
        {Product.map((p) => (
          <Products
            title={p.title}
            subHeader={p.subHeader}
            description={p.description}
          />
        ))}
      </div>
    </div>
  );
};

export default Orders;
