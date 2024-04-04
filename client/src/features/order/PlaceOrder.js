import React from "react";
import * as Yup from "yup";
import { Button } from "@mui/material";
// import { Formik } from "../../components/FormContext/formContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { usePlaceOrder } from "../react-query/order";

function PlaceOrder({ productId, tableNumber }) {
  console.log(productId);
  const { mutate: placeOrder, isError, isSuccess, isLoading } = usePlaceOrder();

  const methods = ["esewa", "khalti", "cash payment", "mobile banking"];
  const handleSubmit = (values) => {
    try {
      console.log(values);
      // alert(values)
      placeOrder(values);
      console.log("values", values);

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
          tableNumber: Yup.string().required("Table Number is Required Field"),
          quantity: Yup.number().required("Quantity is Required Field"),
          payment: Yup.object().shape({
            type: Yup.string().required("Payment Type is Required Field"),
          }),
        })}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
      >
        <>
          {/* {({ isSubmitting }) => ( */}
          <Form>
            <div>
              <label htmlFor="tableNumber">Table Number</label>
              <Field as="select" name="tableNumber">
                <option value="">Select Table Number</option>
                {tableNumber.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="tableNumber" />
            </div>
            <div>
              <label htmlFor="payment.type">Payment Type</label>
              <Field as="select" name="payment.type">
                <option value="">Select Payment Type</option>
                {methods.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="payment.type"
                component="div"
                className="error-message"
              />
            </div>
            <div>
              <label htmlFor="quantity">Quantity</label>
              <Field type="text" name="quantity" />
              <ErrorMessage name="quantity" />
            </div>
            <button type="submit" disabled={isLoading}>
              Submit
            </button>
          </Form>
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
