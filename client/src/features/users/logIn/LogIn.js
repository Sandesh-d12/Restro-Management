import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { toast } from "react-hot-toast";

const schema = Yup.object().shape({
  email: Yup.string()
    .required("Email is a required field")
    .email("Invalid email format"),
  password: Yup.string().required("Password is a required field"),
});

export const LogIn = () => {
  const [reload, setReload] = useState(false);
  const initialValues = {
    email: "",
    password: "",
  };

  const navigate = useNavigate();
  if (reload) {
    window.location.reload();
  }
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: schema,
    onSubmit: async (values, actions) => {
      try {
        const response = await fetch("http://localhost:3001/api/user/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
 
        if (!response.ok) {
          // alert("invalid login credentials");
          // throw new Error("Failed to login");
        }

        const data = await response.json();
        localStorage.setItem("user", JSON.stringify(data?.data));
        if (data.message) {
          alert(data.message);
          // <Redirect to='/dashboard') /> ;
          navigate("/dashboard");
          actions.setSubmitting(false);
          setReload(true);
        }
        navigate("/dashboard");
      } catch (error) {
        alert("invalid login credentials");
      }
    },
  });

  // useEffect(() => {
  //   if (data) {
  //     navigate('/dashboard');
  //   }
  // }, [data, navigate]);

  return (
    <div>
      <div
        style={{
          width: "360px",
          padding: "8% 0 0",
          margin: "auto",
        }}
      >
        <form
          style={{
            position: "relative",
            zIndex: 1,
            background: "#FFFFFF",
            borderRadius: "10px",
            maxWidth: "360px",
            margin: "0 auto 100px",
            padding: "45px",
            textAlign: "center",
          }}
          onSubmit={formik.handleSubmit}
        >
          <span
            style={{
              fontSize: "40px",
              color: "#4b6cb7",
              marginBottom: "25px",
              display: "block",
            }}
          >
            Login
          </span>
          <input
            type="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            placeholder="Enter email id / username"
            id="email"
          />
          <p style={{ color: "red" }}>
            {formik.errors.email && formik.touched.email && formik.errors.email}
          </p>
          <input
            type="password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            placeholder="Enter password"
          />
          <p style={{ color: "red" }}>
            {formik.errors.password &&
              formik.touched.password &&
              formik.errors.password}
          </p>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};
