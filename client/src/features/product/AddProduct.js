import React from "react";
import * as Yup from "yup";
import { Button } from "@mui/material";
import { Formik } from "../../components/FormContext/formContext";
import { useAddNewProduct } from "../react-query/products";

export const categoryOptions = [
  { label: "Beverage", value: "beverage" },
  { label: "Starter", value: "starter" },
  { label: "Main Course", value: "main_course" },
  { label: "Desserts", value: "desserts" },
  { label: "Chef Special", value: "chef_special" },
];

export default function AddProduct() {
  const {
    mutate: addProduct,
    isError,
    isSuccess,
    isLoading,
  } = useAddNewProduct();

  const handleSubmit = (values) => {
    try {
      addProduct(values);
    } catch (error) {
      alert(error.message);
    }
  };

  if (isSuccess) {
    window.location.reload();
  }

  if (isLoading) {
    return <h1>Loading....</h1>;
  }

  return (
    <Formik
      initialValues={{
        name: "",
        price: "",
        quantity: "",
        category: "", // Added category field
      }}
      validationSchema={Yup.object({
        name: Yup.string()
          .max(35, "Must be 35 characters or less")
          .required("Product Name is Required Field"),
        price: Yup.number()
          .required("Price is Required Field"),
        quantity: Yup.number()
          .required("Quantity is Required Field"),
        category: Yup.string()
          .oneOf(
            categoryOptions.map(option => option.value),
            "Invalid Category"
          )
          .required("Category is Required Field"), // Added validation for category
      })}
      onSubmit={(values) => {
        handleSubmit(values);
      }}
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: "12px",
            }}
          >
            <div
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              <span
                style={{
                  fontSize: "20px",
                  fontWeight: 700,
                  color: "#042848eb",
                }}
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
            <div
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
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

            <div
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
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

            <div
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              <label htmlFor="category">Category</label>
              <select
                id="category"
                {...formik.getFieldProps("category")}
                style={{ height: "40px" }}
              >
                <option value="" label="Select category" />
                {categoryOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {formik.touched.category && formik.errors.category ? (
                <div style={{ color: "red" }}>{formik.errors.category}</div>
              ) : null}
            </div>
    
            <Button
              style={{
                height: "40px",
                marginTop: "20px",
                textAlign: "center",
                color: "#1976d2",
              }}
              type="submit"
              variant="outlined"
            >
              Add Product
            </Button>
          </div>
        </form>
      )}
    </Formik>
  );
}
