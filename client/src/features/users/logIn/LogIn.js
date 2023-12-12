import React from "react";
import { Formik } from "../../../components/FormContext/formContext";
import * as Yup from "yup";
import { useContext } from "react";
import axios from "axios";
import { useNavigate, Navigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";

export const LogIn = () => {
  const navigate = useNavigate();

  const ctx = useContext(AuthContext);

  // console.log('formik',formik)
  return (
    <>
      <Formik
        initialValues={{ email: "" }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Invalid email address")
            .required("Required"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            axios
              .post(
                "http://localhost:3001/logIn",
                { email: values.email },
                new URLSearchParams(values.email).toString(),
                {
                  headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                  },
                }
              )
              .then((result) => {
                ctx.onLogIn(result.data);
                // setUser(result.data);
                navigate("/dashboard");
                // return <Navigate to="/dashboard" />;
                location.reload();
                window.location.href("/dashboard");
              })
              .catch((error) => {
                console.error("Error submitting the form:", error);
              })
              .finally(() => {
                setSubmitting(false);
              });
          }, 400);
        }}
      >
        {(formik) => (
          <form
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onSubmit={formik.handleSubmit}
          >
            <div
              style={{
                width: "50%",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <span
                style={{ fontSize: "40px", fontWeight: 700, color: "blue" }}
              >
                LOG IN
              </span>

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
              <p>
                <a href="/signUp">Create new account</a>
              </p>
              <button
                style={{ height: "40px", textAlign: "center" }}
                type="submit"
              >
                Log In
              </button>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
};

//  Login.propTypes = {
//   setToken: PropTypes.func.isRequired
// }
