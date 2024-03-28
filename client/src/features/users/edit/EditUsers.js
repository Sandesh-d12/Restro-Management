import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import { useAllUsers, useUpdateUserMutation } from "../../react-query/users";


const EditUsers = () => {
    const { data, isError, isLoading } = useAllUsers();
    const updateUser = useUpdateUserMutation()
    const {id} = useParams();
    const singleUser = data.find((user)=>user._id === id)

  const formik = useFormik({
    initialValues: {
      firstName: singleUser?.firstName,
      lastName:singleUser?.lastName,
      email: singleUser.email,
      password: singleUser.password,
    },
    // validationSchema: validationSchema,
    onSubmit: (values) => {
      updateUser.mutate({values, id})
      alert(JSON.stringify(values, null, 2));
      // setDisplaySubmit(false);
    },
  });

  const onEdit = () => {
    setDisplaySubmit(true);
  };

  const handleCancel = () => {
    // setDisplaySubmit(false);
    return
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
            id="fName"
            name="fName"
            value={formik.values.firstName}
            onChange={formik.handleChange}
          />
          <span
            style={{ marginBottom: "10px", textAlign: "left", fontWeight: 500 }}
          >
            lastName
          </span>
          <TextField
            fullWidth
            id="lName"
            name="lName"
            value={formik.values.lastName}
            onChange={formik.handleChange}
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
          />
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
          />
          
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Button color="primary" variant="contained" type="submit">
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
