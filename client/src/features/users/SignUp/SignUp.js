import React from "react";
import { Formik } from "../../../components/FormContext/formContext";
import * as Yup from "yup";
import { useCreateUserMutation } from "../../react-query/users";
import { Button } from "@mui/material";

export const SignUp = () => {
  const createPostMutation = useCreateUserMutation();
  const handleSubmit = (values) => {
    try {
      createPostMutation.mutate(values);
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        userType: "Admin" || "User",
        password: "",
      }}
      validationSchema={Yup.object({
        firstName: Yup.string()
          .max(15, "Must be 15 characters or less")
          .required("First Name is Required Field"),
        lastName: Yup.string()
          .max(20, "Must be 20 characters or less")
          .required("Last Name is Required Field"),
        email: Yup.string().email("Invalid email address").required("Required"),
        userType: Yup.string().required("User Type is required"),
      })}
      onSubmit={(values) => {
        handleSubmit(values);
        window.location.reload()
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
              Invite User
            </span>
            <label htmlFor="firstName">First Name</label>
            <input
              style={{ height: "40px" }}
              id="firstName"
              type="text"
              {...formik.getFieldProps("firstName")}
            />
            {formik.touched.firstName && formik.errors.firstName ? (
              <div style={{ color: "red" }}>{formik.errors.firstName}</div>
            ) : null}
            </div>
            <div style={{display:"flex", flexDirection:"column", gap:"8px"}}>
            <label htmlFor="lastName">Last Name</label>
            <input
              style={{ height: "40px" }}
              id="lastName"
              type="text"
              {...formik.getFieldProps("lastName")}
            />
            {formik.touched.lastName && formik.errors.lastName ? (
              <div style={{ color: "red" }}>{formik.errors.lastName}</div>
            ) : null}
            </div>
            <div style={{display:"flex", flexDirection:"column", gap:"8px"}}>
            <label htmlFor="userType">User Type</label>
            <select
              style={{ height: "40px" }}
              id="userType"
              {...formik.getFieldProps("userType")}
            >
              <option value="waiter">Waiter</option>
              <option value="cashier">Cashier</option>
            </select>
            {formik.touched.userType && formik.errors.userType ? (
              <div style={{ color: "red" }}>{formik.errors.userType}</div>
            ) : null}
              </div>
              <div style={{display:"flex", flexDirection:"column", gap:"8px"}}>
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              {...formik.getFieldProps("email")}
              style={{ height: "40px" }}
            />
            {formik.touched.email && formik.errors.email ? (
              <div style={{ color: "red" }}>{formik.errors.email}</div>
            ) : null}
            </div>
            <div style={{display:"flex", flexDirection:"column", gap:"8px"}}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              {...formik.getFieldProps("password")}
              style={{ height: "40px" }}
            />
            {formik.touched.password && formik.errors.password ? (
              <div style={{ color: "red" }}>{formik.errors.password}</div>
            ) : null}
            </div>
            <Button
              style={{ height: "40px", marginTop: "20px", textAlign: "center", color:'black' }}
              type="submit"
              variant='outlined'
            >
              Sign Up
            </Button>
          </div>
        </form>
      )}
    </Formik>
  );
};
