// import React from "react";
// import styles from "./styles/orders.module.css";
// import Products from "../components/products";
// import { useGetProducts } from "./react-query/products";
// import { Button } from "@mui/material";
// import ProductDrawer from "../components/food-menu/Drawer";
// import { useParams } from "react-router-dom";

// const AllProducts = () => {
//   const { data, isLoading } = useGetProducts();
//   const {category} = useParams()
// console.log(category)

// const filteredData = data.filter(item => item.category === category);
//   return (
//     <div className={styles.wrapper}>
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           width: "30%",
//           alignItems: "center",
//         }}
//       >
//         <h1>Available Items</h1>
//         <ProductDrawer type={"product"} />
//       </div>
//       <div className={styles.card}>
//         {filteredData && filteredData?.length !== 0 ? (
//           filteredData?.map((p, index) => (
//             <Products
//               key={index}
//               Id={p?._id}
//               title={p?.name}
//               price={p?.price}
//               quantity={p?.quantity}
//             />
//           ))
//         ) : (
//           <p>No products</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AllProducts;


import React, { useState } from "react";
import styles from "./styles/orders.module.css";
import Products from "../components/products";
import { useGetProducts } from "./react-query/products";
import { Button } from "@mui/material";
import ProductDrawer from "../components/food-menu/Drawer";
import { useParams } from "react-router-dom";
import { usePlaceOrder } from "./react-query/order";
import OrderDrawer from "../components/OrderDrawer";

const AllProducts = () => {
  const { data, isLoading } = useGetProducts();
  const { category } = useParams();
  const { mutate: placeOrder, isError, isSuccess } = usePlaceOrder();
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectionEnabled, setSelectionEnabled] = useState(false);
  const [orderQuantities, setOrderQuantities] = useState({});

  const handleSelect = (id) => {
    setSelectedProducts((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((productId) => productId !== id)
        : [...prevSelected, id]
    );
  };

  const handleQuantityChange = (id, quantity) => {
    setOrderQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: quantity,
    }));
  };

  const handlePlaceOrderClick = () => {
    setSelectionEnabled(true);
  };

  const handleSubmitOrder = (values) => {
    console.log('values',values)
    const selectedData = data.filter((item) => selectedProducts.includes(item._id))
      .map(item => ({
        ...item,
        quantity: orderQuantities[item._id] || 1
      }));
    // Place your order logic here, for example:
    placeOrder({
    
      table_number: values?.table_number,
      paymentType: values?.payment,
      product: selectedData,
    });
    // After placing the order, you can reset the state or navigate to another page.
    setSelectedProducts([]);
    setSelectionEnabled(false);
    setOrderQuantities({});
  };

  const filteredData = data?.filter((item) => item.category === category);

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
        <ProductDrawer type={"product"} />
      </div>
      <Button
        variant="contained"
        color="primary"
        onClick={handlePlaceOrderClick}
        disabled={selectionEnabled}
      >
     Select Items
      </Button>
      <div className={styles.card}>
        {filteredData && filteredData.length !== 0 ? (
          filteredData.map((p, index) => (
            <Products
              key={index}
              Id={p._id}
              title={p.name}
              price={p.price}
              quantity={p.quantity}
              selected={selectedProducts.includes(p._id)}
              onSelect={handleSelect}
              selectionEnabled={selectionEnabled}
              orderQuantity={orderQuantities[p._id] || 1}
              onQuantityChange={handleQuantityChange}
            />
          ))
        ) : (
          <p>No products</p>
        )}
      </div>
      {selectionEnabled && (
        // <Button
        //   variant="contained"
        //   color="secondary"
        //   onClick={handleSubmitOrder}
        //   disabled={selectedProducts.length === 0}
        // >
        //   Submit Order
        // </Button>
        <OrderDrawer onClick={handleSubmitOrder}/>
      )}
    </div>
  );
};

export default AllProducts;
