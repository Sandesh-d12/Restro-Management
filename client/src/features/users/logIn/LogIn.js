import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useLoginUser } from "../../react-query/users";

// Creating schema
const schema = Yup.object().shape({
  email: Yup.string()
    .required("Email is a required field")
    .email("Invalid email format"),
  password: Yup.string()
    .required("Password is a required field")
    .min(8, "Password must be at least 8 characters"),
});

export const LogIn = () => {
  const [userData, setUserData] = React.useState("");
  const { data } = useLoginUser(userData);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log(values);
      setUserData(values);
      if (data) {
        localStorage.setItem("user", JSON.stringify(data));
        navigate("/dashboard");
        window.location.reload();
      }
    },
  });

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
          noValidate
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
            style={{
              outline: "0",
              background: "#f2f2f2",
              width: "100%",
              border: "0",
              borderRadius: "5px",
              margin: "0 0 15px",
              padding: "15px",
              boxSizing: "border-box",
              fontSize: "14px",
            }}
            id="email"
          />
          <p
            style={{
              margin: "0 0 10px 10px",
              textAlign: "left",
              fontSize: "10px",
              color: "red",
            }}
          >
            {formik.errors.email && formik.touched.email && formik.errors.email}
          </p>
          <input
            type="password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            placeholder="Enter password"
            style={{
              outline: "0",
              background: "#f2f2f2",
              width: "100%",
              border: "0",
              borderRadius: "5px",
              margin: "0 0 15px",
              padding: "15px",
              boxSizing: "border-box",
              fontSize: "14px",
            }}
          />
          <p
            style={{
              margin: "0 0 10px 10px",
              textAlign: "left",
              fontSize: "10px",
              color: "red",
            }}
          >
            {formik.errors.password &&
              formik.touched.password &&
              formik.errors.password}
          </p>
          <button
            type="submit"
            style={{
              textTransform: "uppercase",
              outline: "0",
              background: "#4b6cb7",
              width: "100%",
              border: "0",
              borderRadius: "5px",
              padding: "15px",
              color: "#FFFFFF",
              fontSize: "14px",
              transition: "all 0.3s ease",
              cursor: "pointer",
            }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};
