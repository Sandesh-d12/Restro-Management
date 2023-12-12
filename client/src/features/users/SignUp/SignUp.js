import React from "react";
import { Formik } from "../../../components/FormContext/formContext";
import * as Yup from "yup";
import { useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const SignUp = () => {
  const formik = useContext(Formik);
  const navigate = useNavigate();
  console.log("formik", formik);
  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        userType: "Admin" || "User",
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
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          axios
            .post(
              "http://localhost:3001/createUser",
              {
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                userType: values.userType,
              },
              new URLSearchParams(values).toString(),
              {
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
                },
              }
            )
            .then((result) => {
              navigate("/");
            })
            .catch((error) => {
              console.error("Error while signing up:", error);
            })
            .finally(() => {
              setSubmitting(false);
            });
        }, 400);
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
