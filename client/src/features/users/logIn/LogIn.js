import React from "react";
import { Formik } from "../../../components/FormContext/formContext";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useLoginUser } from "../../react-query/users";


export const LogIn = () => {
  const [userData, setUserData] = React.useState()
  const navigate = useNavigate();
  const { data, error, isLoading } = useLoginUser(userData);
 
 const handleSubmit = (e) =>{
  setUserData(e)
  localStorage.setItem("user", JSON.stringify(data));
 }

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
        handleSubmit(values)
        navigate("/dashboard");
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
