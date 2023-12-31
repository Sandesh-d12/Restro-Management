import React from "react";
import { Formik } from "../../../components/FormContext/formContext";
import * as Yup from "yup";
import {
  useCreateUserMutation,
} from "../../react-query/users";

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
        password:''
      }}
      validationSchema={Yup.object({
        firstName: Yup.string()
          .max(15, "Must be 15 characters or less")
          .required("Required"),
        lastName: Yup.string()
          .max(20, "Must be 20 characters or less")
          .required("Required"),
        email: Yup.string().email("Invalid email address").required("Required"),
        userType: Yup.string().required("User Type is required"),
      })}
      onSubmit={(values) => {
        handleSubmit(values);

   
      }}
    >
      {(formik) => (
        <form
          style={{ display: "flex", justifyContent: "center" }}
          onSubmit={formik.handleSubmit}
        >
          <div
            style={{
              width: "50%",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: "20px",
            }}
          >
            <span
              style={{ fontSize: "40px", fontWeight: 700, color: "#042848eb" }}
            >
              SIGN UP
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

            <label htmlFor="userType">User Type</label>
            <select
              style={{ height: "40px" }}
              id="userType"
              {...formik.getFieldProps("userType")}
            >
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
            {formik.touched.userType && formik.errors.userType ? (
              <div style={{ color: "red" }}>{formik.errors.userType}</div>
            ) : null}

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
            <button
              style={{ height: "40px", marginTop: "20px", textAlign: "center" }}
              type="submit"
            >
              Sign Up
            </button>
          </div>
        </form>
      )}
    </Formik>
  );
};
