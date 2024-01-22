import styled from "@emotion/styled";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import * as React from "react";
import { useUpdateProduct } from "../features/react-query/products";
import { useFormik } from "formik";
import { toast } from "react-hot-toast";
import * as Yup from "yup";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function PlaceOrderModal({ id, open, handleClose, title }) {
  console.log(id);
  const updateProduct = useUpdateProduct();
  const formik = useFormik({
    initialValues: {
      name: "",
      quantity: "",
      price: "",
    },
    onSubmit: (values) => {
      try {
        updateProduct.mutate({ values, id });
        toast.success("product updated successfully");
        window.location.reload();
      } catch (error) {
        toast.error(error.message);
      }
    },
  });

  return (
    <div>
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
          <span>Edit the product details of: {title} </span>
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
          <input
            style={{
              padding: "8px",
            }}
            type="text"
            id="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Name"
          />
          <input
            style={{
              padding: "8px",
            }}
            type="number"
            id="quantity"
            placeholder="Quantity"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.quantity}
          />
          <input
            style={{
              padding: "8px",
            }}
            type="number"
            id="price"
            placeholder="Price"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.price}
          />

          <button
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
          </button>
        </form>
      </Dialog>
    </div>
  );
}
