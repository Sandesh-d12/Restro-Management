import React from "react";
import * as Yup from "yup";
import { Button } from "@mui/material";
// import { Formik } from "../../components/FormContext/formContext";
import { Formik, Form, Field } from "formik";
import { usePlaceOrder } from "../react-query/order";
import AllDrawer from "../../components/food-menu/Drawer";

function PlaceOrder({ productId }) {
  console.log(productId);
  const { mutate: placeOrder, isError, isSuccess, isLoading } = usePlaceOrder();
  const handleSubmit = (values) => {
    try {
      console.log(values);
      // alert(values)
      placeOrder(values);

      // toast.success("product added successfully");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          tableNumber: "",
          payment: {
            type: "",
            status: "pending",
          },
          productId: productId,
          quantity: "",
        }}
        validationSchema={Yup.object({
          tableNumber: Yup.string().required("Product Name is Required Field"),
          quantity: Yup.number()
          .required("Quantity is Required Field"),
        })}
        onSubmit={(values) => {
          // alert(values)
          console.log(values);
          handleSubmit(values);
        }}
      >
        <>
      
          {/* {({ isSubmitting }) => ( */}
            <Form>
              <div>
                <label htmlFor="tableNumber">Table Number</label>
                <Field type="text" name="tableNumber" />
              </div>
              <div>
                <label htmlFor="payment.type">Payment Type</label>
                <Field type="text" name="payment.type" />
              </div>
              <div>
                <label htmlFor="quantity">Quantity</label>
                <Field type="text" name="quantity" />
              </div>
              <button type="submit" disabled={isLoading} >
                Submit
              </button>
            </Form>
          {/* )} */}
        </>
      </Formik>
      {isSuccess && (
            <p>
              order placed successfully, <a href="/order"> view</a>{" "}
            </p>
          )}
    </>
  );
}

export default PlaceOrder;
