import React from "react";
import * as Yup from "yup";
import { Button } from "@mui/material";
// import { Formik } from "../../components/FormContext/formContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { usePlaceOrder } from "../react-query/order";

function PlaceOrder({ tableNumber, onClick }) {
  const { mutate: placeOrder, isError, isSuccess, isLoading } = usePlaceOrder();

  const methods = ["esewa", "khalti", "cash_payment", "mobile_banking"];
  // const handleSubmit = (values) => {
  //   try {
  //     placeOrder(values);
  //   } catch (error) {
  //     alert(error.message);
  //   }
  // };

  return (
    <>
      <Formik
        initialValues={{
          table_number: "",
          payment: {
            type: "",
            status: "pending",
          },
        }}
        validationSchema={Yup.object({
          table_number: Yup.string().required("Table Number is Required Field"),
          payment: Yup.object().shape({
            type: Yup.string().required("Payment Type is Required Field"),
          }),
        })}
        onSubmit={(values) => {
          onClick(values );
        }}
      >
        <>
          {/* {({ isSubmitting }) => ( */}
          <span
            style={{
              color: "#042848eb",
              fontSize: "20px",
              fontWeight: 700,
              marginBottom: "8px",
            }}
          >
            Place Order
          </span>
          <br />
          <Form
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            <div>
              <label htmlFor="table_number">Table Number</label>
              <br />
              <Field
                as="select"
                name="table_number"
                style={{ width: "100%", height: "50px" }}
              >
                <option value="">Select Table Number</option>
                {tableNumber.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </Field>

              <ErrorMessage style={{ color: "red" }} name="table_number" />
            </div>
            <div>
              <label htmlFor="payment.type">Payment Type</label>
              <Field
                as="select"
                name="payment.type"
                style={{ width: "100%", height: "50px" }}
              >
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
            <Button type="submit" variant="outlined" disabled={isLoading}>
              Submit
            </Button>
          </Form>
        </>
      </Formik>
      {isSuccess && (
        <p>
          order placed successfully <a href="/order"> view</a>{" "}
        </p>
      )}
    </>
  );
}

export default PlaceOrder;
