import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useFormik } from "formik";
import { useParams, useSearchParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAllUsers, useUpdateUserMutation } from "../../react-query/users";

const EditUsers = () => {
  const { data, isError, isLoading } = useAllUsers();
  const { id } = useParams();
  const [displaySubmit, setDisplaySubmit] = useState(false);
  const [singleUser, setSingleUser] = useState(null);
  const updateUser = useUpdateUserMutation();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (data) {
      const single = data.find((user) => user._id === id);
      setSingleUser(single);
    }
  }, [data, id]);

  const formik = useFormik({
    initialValues: {
      firstName: singleUser?.firstName || '',
      lastName: singleUser?.lastName || '',
      email: singleUser?.email || '',
      password: singleUser?.password || '',
      userType: singleUser?.userType || '',
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      firstName: Yup.string().trim().strict(true)
        .max(15, "Must be 15 characters or less")
        .required("First Name is Required Field"),
      lastName: Yup.string().trim().strict(true)
        .max(20, "Must be 20 characters or less")
        .required("Last Name is Required Field"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("password is required"),
    }),
    onSubmit: (values) => {
      updateUser.mutate({ values, id });
      toast.success("User updated successfully");
      setDisplaySubmit(false);
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
          <span>Edit User</span>
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
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
            disabled={!displaySubmit}
          />
          <span
            style={{ marginBottom: "10px", textAlign: "left", fontWeight: 500 }}
          >
            lastName
          </span>
          <TextField
            fullWidth
            id="lastName"
            name="lastName"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
            disabled={!displaySubmit}
          />
          <span
            style={{ marginBottom: "10px", textAlign: "left", fontWeight: 500 }}
          >
            {" "}
            Email
          </span>
          <TextField
            fullWidth
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            disabled={!displaySubmit}
          />
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            name="userType"
            value={formik.values.userType}
            onChange={formik.handleChange}
            disabled={!displaySubmit}
          >
            <MenuItem style={{ textAlign: "left" }} value={"cashier"}>
              Cashier
            </MenuItem>
            <MenuItem style={{ textAlign: "left" }} value={"waiter"}>
              Waiter
            </MenuItem>
            <MenuItem style={{ textAlign: "left" }} value={"admin"}>
              Admin
            </MenuItem>
          </Select>
          <span
            style={{ marginBottom: "10px", textAlign: "left", fontWeight: 500 }}
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
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            disabled={!displaySubmit}
          />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {displaySubmit && (
              <>
                <Button
                  color="primary"
                  variant="contained"
                  type="submit"
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
              </>
            )}
          </div>
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
  );
};

export default EditUsers;
