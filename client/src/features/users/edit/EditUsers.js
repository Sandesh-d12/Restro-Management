import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import { useAllUsers } from "../../react-query/users";


const EditUsers = () => {
    const { data, isError, isLoading } = useAllUsers();
    const {id} = useParams();
    console.log(id)

 
    const singleUser = data.find((user)=>user._id === id)
    console.log('singleUser',singleUser)
  const formik = useFormik({
    initialValues: {
      name: singleUser?.firstName,
      contactNo: "",
      email: singleUser.email,
      password: singleUser.password,
    },
    // validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      setDisplaySubmit(false);
    },
  });

  const onEdit = () => {
    setDisplaySubmit(true);
  };

  const handleCancel = () => {
    setDisplaySubmit(false);
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
            Name
          </span>
          <TextField
            fullWidth
            id="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
          <span
            style={{ marginBottom: "10px", textAlign: "left", fontWeight: 500 }}
          >
            Contact Number
          </span>
          <TextField
            fullWidth
            id="contact"
            name="contact"
            value={formik.values.contactNo}
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
