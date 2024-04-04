import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import * as Yup from "yup";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useFormik } from "formik";
import React, { useState } from "react";
import {
  useAllUsers,
  useUpdateUserMutation,
} from "../../features/react-query/users";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

const Details = () => {
  const [displaySubmit, setDisplaySubmit] = useState(false);

  const {mutate:updateUser, isSuccess} = useUpdateUserMutation();
  // const { data, isError, isLoading } = useAllUsers();
  // console.log('data',data)
  // console.log('isSuccess',isSuccess)
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  console.log("user", user);
  const id = user?._id;
  // const user = data.find((user)=>user._id === id)
  const formik = useFormik({
    initialValues: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      userType: user?.userType,
      password: user?.password,
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("First Name is Required Field"),
      lastName: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("Last Name is Required Field"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("password is required"),
    }),
    onSubmit: (values) => {
      updateUser({ values, id });
      console.log('uUuu',updateUser)
      setDisplaySubmit(false);
      toast.success("profile edited successfully");
    },
  });

  const onEdit = () => {
    setDisplaySubmit(true);
  };

  const handleCancel = () => {
    setDisplaySubmit(false);
    window.location.reload();
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          paddingLeft: "40px",
          width: "98%",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "30%",
            display: "flex",
            paddingTop: "50px",
            flexDirection: "column",
          }}
        >
          <span
            style={{
              fontSize: "24px",
              fontWeight: 500,
              marginBottom: "30px",
            }}
          >
            <span>Profile</span>
            <button
              style={{
                backgroundColor: "#36b9cc",
                border: "1px solid #36b9cc",
                borderRadius: "4px",
                padding: "8px",
                display: displaySubmit ? "none" : "block",
              }}
              onClick={onEdit}
            >
              Edit
            </button>
          </span>
          <form
            onSubmit={formik.handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <span
              style={{
                paddingBottom: "10px",
                textAlign: "left",
                fontWeight: 500,
              }}
            >
              {" "}
              First Name
            </span>
            <TextField
              fullWidth
              id="firstName"
              name="firstName"
              value={formik.values.firstName}
              disabled={!displaySubmit}
              onChange={formik.handleChange}
            />
            <span
              style={{
                marginBottom: "10px",
                textAlign: "left",
                fontWeight: 500,
              }}
            >
              lastName
            </span>
            <TextField
              fullWidth
              id="lastName"
              name="lastName"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              disabled={user?.userType !== "admin" && !displaySubmit}
            />
            <span
              style={{
                marginBottom: "10px",
                textAlign: "left",
                fontWeight: 500,
              }}
            >
              {" "}
              Email
            </span>
            <TextField
              fullWidth
              id="email"
              name="email"
              value={formik.values.email}
              disabled={user?.userType !== "admin" && !displaySubmit}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <span
              style={{
                marginBottom: "10px",
                textAlign: "left",
                fontWeight: 500,
              }}
            >
              Password
            </span>
            <TextField
              fullWidth
              id="password"
              name="password"
              type="text"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={!displaySubmit}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            {displaySubmit && (
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={formik.handleSubmit}
                >
                  Submit
                </Button>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </div>
            )}
          </form>
        </div>
        <div>
          <div
            style={{
              paddingTop: "48px",
              paddingLeft: "50px",
            }}
          >
            <img
              src="/owner.jpg"
              width="100"
              height="100"
              style={{ border: "1px solid #36b9cc", padding: "5px" }}
              alt="Owner"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;
