// import React from "react";

// function Details() {
//   return (
//     <div>
//       details
//       <div style={{ backgroundColor: "#f8f9fc" }}></div>
//     </div>
//   );
// }

// export default Details;

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import React, { useState } from "react";

const Details = () => {
  const [displaySubmit, setDisplaySubmit] = useState(false);
  const formik = useFormik({
    initialValues: {
      name: "Super Admin",
      contactNo: "98612345",
      email: "foobar@example.com",
      password: "foobar",
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

  return (
    <div style={{ display: "flex" }}>
      <div
        style={{
          width: "30%",
          display: "flex",
          paddingLeft: "300px",
          paddingTop: "50px",
          flexDirection: "column",
        }}
      >
        <span
          style={{
            fontSize: "24px",
            fontWeight: 500,
            marginBottom: "30px",
            justifyContent: "space-between",
            display: "flex",
          }}
        >
          <span>Profile</span>
          <button
            style={{
              backgroundColor: "#36b9cc",
              border: "1px solid #36b9cc",
              borderRadius: "4px",
              padding: "8px",
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
            Name
          </span>
          <TextField
            fullWidth
            id="email"
            name="email"
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
            id="email"
            name="email"
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
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            // onBlur={formik.handleBlur}
            // error={formik.touched.password && Boolean(formik.errors.password)}
            // helperText={formik.touched.password && formik.errors.password}
          />
          {displaySubmit === true ? (
            <Button color="primary" variant="contained" fullWidth type="submit">
              Submit
            </Button>
          ) : (
            ""
          )}
        </form>
      </div>
      <div>
        <div
          style={{
            paddingTop: "150px",
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

export default Details;
