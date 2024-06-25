import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { CustomButton } from "./table-management/Table";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import TextField from '@mui/material/TextField';
import { useAllTable, useUpdateTable } from "../features/react-query/table";
import FormHelperText from '@mui/material/FormHelperText';
import { Button } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};


const validationSchema = Yup.object().shape({
  tableNumber: Yup.number().required("Table number is required"),
  tableCapacity: Yup.number()
    .required("Table capacity is required")
    .min(1, "Capacity must be at least 1"),
  occupancy: Yup.number()
    .required("Occupancy is required")
    .min(0, "Occupancy must be at least 0")
    .max(Yup.ref('tableCapacity'), "Occupancy cannot exceed table capacity"),
});


export default function EditTableModal({id}) {
  const [open, setOpen] = React.useState(false);
  const { data } = useAllTable();
  const updateTable = useUpdateTable()
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const formStyles = {
    marginBottom:'16px',
    '& .error-text':{
        color:'red'
    }
  }

  const singleTable = data.find((item)=>item._id === id)

  return (
    <div>
      <CustomButton type="edit" onClick={handleOpen} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit Table
          </Typography>
          <Formik
            initialValues={{ tableNumber: singleTable?.tableNumber || '', tableCapacity:singleTable?.tableCapacity || '', occupancy: singleTable?.occupancy || '' }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
                const data = {
                    id,
                    ...values
                }
            updateTable.mutate(data)
            }}
          >
            {({ isSubmitting, formik }) => (
              <Form>
                <Field
                  as={TextField}
                  name="tableNumber"
                  label="Table Number"
                  fullWidth
                    sx={formStyles}
                    helperText={
                        <ErrorMessage name="tableNumber">
                          {msg => <FormHelperText className="error-text">{msg}</FormHelperText>}
                        </ErrorMessage>
                      }
                />
                <Field
                  as={TextField}
                  name="tableCapacity"
                  label="Table Capacity"
                  fullWidth
                  sx={formStyles}
                helperText={
                    <ErrorMessage name="tableCapacity">
                      {msg => <FormHelperText className="error-text">{msg}</FormHelperText>}
                    </ErrorMessage>
                  }
                />
                <Field
                  as={TextField}
                  name="occupancy"
                  label="Occupancy"
                  fullWidth
                  sx={formStyles}
                helperText={
                    <ErrorMessage name="occupancy">
                      {msg => <FormHelperText className="error-text">{msg}</FormHelperText>}
                    </ErrorMessage>
                  }                />
                <Button variant="contained" type="submit">
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Modal>
    </div>
  );
}
