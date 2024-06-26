import styled from "@emotion/styled";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import * as React from "react";
import { useUpdateProduct } from "../features/react-query/products";
import { useFormik } from "formik";
import { toast } from "react-hot-toast";
import * as Yup from "yup";
import { Button } from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditProductModal({
  id,
  open,
  handleClose,
  title,
  price,
  quantity,
}) {
  const updateProduct = useUpdateProduct();
  
  const formik = useFormik({
    initialValues: {
      name: title,
      quantity: quantity,
      price: price,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      quantity: Yup.number()
        .required("Quantity is required")
        .test(
          "is-number",
          "Quantity must be a number and greater than 0",
          (value) => !isNaN(value) && value > 0
        ),
      price: Yup.number()
        .required("Price is required")
        .test(
          "is-number",
          "price must be a number and greater than 0",
          (value) => !isNaN(value) && value > 0
        ),
    }),
    onSubmit: (values) => {
      updateProduct.mutate({ values, id });
      alert("product updated successfully");
      handleClose();
      window.location.reload();
    },
  });

  return (
    <div >
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <div
          style={{
            padding: "20px 20px 0 20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span><b>Edit the product details of: </b>{title} </span>
          <button
            style={{
              float: "right",
              padding: "12px",
              outline: "none",
              border: "none",
              backgroundColor: "#fff",
            }}
            onClick={handleClose}
          >
            X
          </button>
        </div>
        <form
          style={{
            width: "20vw",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "6px",
          }}
          onSubmit={formik.handleSubmit}
        >
          <div style={{ display: "flex", gap: "16px" }}>
            <span style={{ width: "50px", textAlign: "left" }}>name</span>
            <input
              style={{
                padding: "8px",
              }}
              type="text"
              id="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
          </div>
          {formik.touched.name && formik.errors.name ? (
            <div style={{ color: "red" }}>{formik.errors.name}</div>
          ) : null}
          <div style={{ display: "flex", gap: "16px" }}>
            <span style={{ width: "50px", textAlign: "left" }}>price</span>
            <input
              style={{
                padding: "8px",
              }}
              type="text"
              id="price"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.price}
              // value={price}
            />
          </div>
          {formik.touched.price && formik.errors.price ? (
            <div style={{ color: "red" }}>{formik.errors.price}</div>
          ) : null}
          <div style={{ display: "flex", gap: "16px" }}>
            <span style={{ width: "50px", textAlign: "left" }}>quantity</span>
            <input
              style={{
                padding: "8px",
              }}
              type="text"
              id="quantity"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.quantity}
            />
          </div>
          {formik.touched.quantity && formik.errors.quantity ? (
            <div style={{ color: "red" }}>{formik.errors.quantity}</div>
          ) : null}
          {/* <button
            style={{
              padding: "10px 10px",
              border: "none",
              cursor: "pointer",
              backgroundColor: "#36b9cc",
              color: "white",
              fontSize: "14px",
              borderRadius: "4px",
              transition: "background-color 0.3s ease",

              "&:hover": {
                backgroundColor: "#2a8aae",
              },
            }}
            type="submit"
          >
            Edit
          </button> */}
          <Button variant="outlined" type="submit">Edit</Button>
        </form>
      </Dialog>
    </div>
  );
}
