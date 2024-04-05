import React, { useState } from "react";
import * as Yup from "yup";

import { Button } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { addTable } from "../../features/react-query/table";
import toast from "react-hot-toast";

export const AddTable = () => {
  const [reload, setReload] = React.useState(false)
  if(reload){
    window.location.reload()
  }
  return (
    <Formik
      initialValues={{
        tableCapacity: "",
        tableNumber: "",
        occupancy: 0,
      }}
      validationSchema={Yup.object({
        tableCapacity: Yup.string()
          .test(
            "is-number",
            "Table Capacity must be a number and greater than 0",
            (value) => !isNaN(value) && value > 0
          )
          .test(
            "max-capacity",
            "Table Capacity must not be greater than 20",
            (value) => parseInt(value) <= 20
          )
          .required("Table Capacity is Required Field"),
        tableNumber: Yup.string()

          .required("Table Number is Required Field")
          .test(
            "is-number",
            "Table Number must be a number and greater than 0",
            (value) => !isNaN(value) && value > 0
          ),
        occupancy: Yup.string().required("Required"),
      })}
      onSubmit={(values) => {
        addTable(values);
        toast.success("table added successfully");
        setReload(true)
      }}
    >
      <Form>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "12px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <span
              style={{ fontSize: "20px", fontWeight: 700, color: "#042848eb" }}
            >
              Add Table
            </span>
            <label htmlFor="tableNumber">Table Number</label>
            <Field
              style={{ height: "40px" }}
              id="tableNumber"
              type="text"
              name="tableNumber"
            />
            <ErrorMessage
              name="tableNumber"
              component="div"
              style={{ color: "red" }}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label htmlFor="tableCapacity">Table Capacity</label>
            <Field
              style={{ height: "40px" }}
              id="tableCapacity"
              type="text"
              name="tableCapacity"
            />
            <ErrorMessage
              name="tableCapacity"
              component="div"
              style={{ color: "red" }}
            />
          </div>
          <Button
            style={{
              height: "40px",
              marginTop: "20px",
              textAlign: "center",
              color: "black",
            }}
            type="submit"
            variant="outlined"
          >
            Add Table
          </Button>
        </div>
      </Form>
    </Formik>
  );
};
