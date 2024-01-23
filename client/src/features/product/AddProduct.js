import React from "react";
import * as Yup from "yup";
import { Button } from "@mui/material";
import { Formik } from "../../components/FormContext/formContext";
import { useAddNewProduct } from "../react-query/products";

export default function AddProduct(){
const addNewProduct = useAddNewProduct()
  const handleSubmit = (values) => {
    try {
      
        addNewProduct.mutate(values)
    window.location.reload()
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <Formik
      initialValues={{
        name: "",
        price: "",
        quantity: "",
      }}
      validationSchema={Yup.object({
        name: Yup.string()
          .max(35, "Must be 15 characters or less")
          .required("Product Name is Required Field"),
       price: Yup.number()
  
          .required("Price is Required Field"),
          quantity: Yup.number()
    
          .required("Quantity is Required Field"),

      })}
      onSubmit={(values) => {
        handleSubmit(values);
      
      }}
    >
      {(formik) => (
        <form
          onSubmit={formik.handleSubmit}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: "12px",
            }}
          >
            <div style={{display:"flex", flexDirection:"column", gap:"8px"}}>
            <span
              style={{ fontSize: "20px", fontWeight: 700, color: "#042848eb" }}
            >
           Add New Product
            </span>
            <label htmlFor="name"> Name</label>
            <input
              style={{ height: "40px" }}
              id="name"
              type="text"
              {...formik.getFieldProps("name")}
            />
            {formik.touched.name && formik.errors.name ? (
              <div style={{ color: "red" }}>{formik.errors.name}</div>
            ) : null}
            </div>
            <div style={{display:"flex", flexDirection:"column", gap:"8px"}}>
            <label htmlFor="price">Price</label>
            <input
              style={{ height: "40px" }}
              id="price"
              type="number"
              {...formik.getFieldProps("price")}
            />
            {formik.touched.price && formik.errors.price ? (
              <div style={{ color: "red" }}>{formik.errors.price}</div>
            ) : null}
            </div>
          
              <div style={{display:"flex", flexDirection:"column", gap:"8px"}}>
            <label htmlFor="quantity">Quantity</label>
            <input
              id="quantity"
              type="number"
              {...formik.getFieldProps("quantity")}
              style={{ height: "40px" }}
            />
            {formik.touched.quantity && formik.errors.quantity ? (
              <div style={{ color: "red" }}>{formik.errors.quantity}</div>
            ) : null}
            </div>
            
            <Button
              style={{ height: "40px", marginTop: "20px", textAlign: "center", color:'black' }}
              type="submit"
              variant='outlined'
            >
             Add Product
            </Button>
          </div>
        </form>
      )}
    </Formik>
  );
};




