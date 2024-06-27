import * as React from "react";
import * as Yup from "yup";
import { Formik, FieldArray } from "formik";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { RiPencilFill } from "react-icons/ri";
import { getOrder, useUpdateOrder } from "../features/react-query/order";
import { useSearchParams } from "react-router-dom";
import { Button } from "@mui/material";
import {
  useGetProducts,
} from "../features/react-query/products";
import { CiTrash } from "react-icons/ci";

const style = {
  position: "absolute",
  top: "50%",
  left: "170%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "#fff",
  // boxShadow: 24,
  p: 4,
  overflowY:'scroll',
  maxHeight:700,
  scrollbarWwidth: 'none', 
  msOverflowStyle: 'none',
  borderRadius:'8px',
  boxShadow:'-2px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.14),0px 9px 46px 8px rgba(0,0,0,0.12)'
};

export default function EditOrderModal({ id }) {
  const updateOrder = useUpdateOrder();
  const { data, isLoading } = useGetProducts();
  let [searchParams, setSearchParams] = useSearchParams();
  const [open, setOpen] = React.useState(false);
  const [singleOrder, setSingleOrder] = React.useState([]);
  const [disableCategory, setDisableCategory] = React.useState(true);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  const userString = localStorage.getItem("user") ?? null;
  let user = userString !== "undefined" ? JSON.parse(userString) : null;

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getOrder(id);
        setSingleOrder(data);
        if (user.userType == "admin" || user.userType == "cashier") {
          setDisableCategory(false);
        } else {
          setDisableCategory(true);
        }
      } catch (error) {
        console.error("Error fetching order:", error);
      }
    };

    fetchData();
  }, [id]);

  const initialValues = {
    paymentDetails: {
      type: singleOrder[0]?.paymentDetails.type,
      status: "pending",
    },
    product: singleOrder[0]?.product.map((item) => ({
      name: item?.name,
      quantity: item?.quantity,
      category: item?.category,
      price: item?.price,
    })),
  };

  const options = [
    { key: "esewa", value: "Esewa" },
    { key: "mobile_banking", value: "Mobile Banking" },
    { key: "khalti", value: "Khalti" },
    { key: "cash_payment", value: "Cash Payment" },
  ];

  const validationSchema = Yup.object().shape({
    paymentDetails: Yup.object().shape({
      type: Yup.string().required("Payment type is required"),
    }),
    product: Yup.array().of(
      Yup.object().shape({
        name: Yup.string().required("Product name is required"),
        quantity: Yup.number()
          .required("Quantity is required")
          .positive("Quantity must be positive"),
        category: Yup.string().required("Category is required"),
      })
    ),
  });

  const category = singleOrder.map((item) => item.product.map((i) => i.name));

  const handleEditButtonClick = (id) => {
    handleOpen(id);
    setSearchParams(id);
  };

  React.useEffect(() => {}, [open]);

  const handleProductChange = (productName, index, setFieldValue) => {
    const selectedProduct = data.find(
      (product) => product.name === productName
    );
    if (selectedProduct) {
      setFieldValue(`product.${index}.name`, selectedProduct.name);
      setFieldValue(`product.${index}.category`, selectedProduct.category);
    }
  };

  return (
    <div>
      <Button
        style={{ cursor: "pointer", backgroundColor: "#fff", border: "none" }}
        onClick={() => handleEditButtonClick(id)}
        variant="outlined"
      >
        <RiPencilFill />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ width: "500px !important" }}
      >
        <Box sx={style}>
          <div>
            <div style={{marginBottom:'20px'}}>
            <span style={{fontSize:'32px', fontWeight:500}}>Edit Order</span>
            </div>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}

              onSubmit={(values) => {
                console.log('values',values)
                const data = {
                  ...values,
                  id: id,
                };
                updateOrder.mutate(data);
                setOpen(false);
                alert('order updated successfully')
                window.location.reload()
              }}
            >
              {({
                values,
                handleChange,
                handleSubmit,
                errors,
                touched,
                setFieldValue,
              }) => (
                <form onSubmit={handleSubmit}>
                  <div style={{ display: "flex", gap: "20px" }}>
                    <label htmlFor="paymentDetails.type">Payment Type</label>
                    <select
                     name="paymentDetails.type"
                     onChange={handleChange}
                      style={{ height: "30px", padding: "0px", width: "15%",border:'1px solid #ccc', borderRadius:'4px' }}
                    >
                      {options.map((item) => (
                        <option
                          value={item?.key}
                          initialValues={values?.paymentDetails?.type}
                        >
                          {item.value}
                        </option>
                      ))}
                    </select>
                  </div>
                  <br />
                  <div style={{ display: "flex", gap: "12px" }}>
                    <label htmlFor="paymentDetails.status">
                      Payment Status
                    </label>
                    <select
                      id="paymentDetails.status"
                      name="paymentDetails.status"
                      onChange={handleChange}
                      value={values.paymentDetails.status}
                      disabled={disableCategory}
                      style={{ height: "30px", padding: "0px", width: "15%", border:'1px solid #ccc', borderRadius:'4px' }}
                    >
                      <option value="pending">Pending</option>
                      <option value="paid">Paid</option>
                    </select>
                  </div>
                  <br />
                  <FieldArray name="product">
                    {({ push, remove }) => (
                      <div>
                        <span style={{fontSize:'24px', fontWeight:500}}>Products</span>
                        {values?.product?.map((item, index) => (
                          <div
                            key={index}
                        
                          >
                            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                            <Button
                              style={{ height: "30px !important", width:'10px !important' }}
                              onClick={() =>
                                push({
                                  name: singleOrder[0]?.product[0]?.name || "",
                                  quantity: "",
                                  category:
                                    singleOrder[0]?.product[0]?.category ||
                                    "beverage",
                                })
                              }
                            >
                              <span style={{color:"#1976d2", fontSize:'24px'}}>+</span>
                            </Button>
                            <Button
                              
                              onClick={() => remove(index)}
                              style={{ height: "30px !important", width:'10px !important' }}
                            >
                              <CiTrash color="red"  />
                            </Button>
                            </div>
                            <div style={{border: '1px solid #ccc' ,display:'flex', borderRadius:'4px', padding:'12px', width:'auto'}}>
                            <div
                              style={{
                                display: "flex",
                                gap: "8px",
                                flexDirection: "column",
                              }}
                            >
                              <label htmlFor={`product.${index}.category`}>
                                Category
                              </label>
                              <input
                                id={`product.${index}.category`}
                                name={`product.${index}.category`}
                                type="text"
                                value={item.category}
                                onChange={handleChange}
                                disabled
                                style={{marginRight:'0px !important'}}
                              />
                              {errors.product?.[index]?.category &&
                              touched.product?.[index]?.category ? (
                                <div>{errors.product[index].category}</div>
                              ) : null}
                            </div>
                            <div
                              style={{
                                display: "flex",
                                gap: "8px",
                                flexDirection: "column",
                                marginRight:'24px'
                              }}
                            >
                              <label htmlFor={`product.${index}.name`}>
                                Product Name
                              </label>
                              <select
                                id={`product.${index}.name`}
                                name={`product.${index}.name`}
                                onChange={(e) =>
                                  handleProductChange(
                                    e.target.value,
                                    index,
                                    setFieldValue
                                  )
                                }
                                value={item.name}
                                style={{
                                  height: "36px",
                                  width: "100%",
                                  border: "1px solid #ccc",
                                  borderRadius: "4px",
                                }}
                              >
                                {data.map((option) => (
                                  <option key={option.name} value={option.name}>
                                    {option.name}
                                  </option>
                                ))}
                              </select>
                              {errors.product?.[index]?.name &&
                              touched.product?.[index]?.name ? (
                                <div>{errors.product[index].name}</div>
                              ) : null}
                            </div>
                            <div   style={{
                                display: "flex",
                                gap: "8px",
                                flexDirection: "column",
                              }}>
                              <label htmlFor={`product.${index}.quantity`}>
                                Quantity
                              </label>
                              <input
                                id={`product.${index}.quantity`}
                                name={`product.${index}.quantity`}
                                type="number"
                                onChange={handleChange}
                                value={item.quantity}
                                style={{ border: "1px solid #ccc" }}
                              />
                              {errors.product?.[index]?.quantity &&
                              touched.product?.[index]?.quantity ? (
                                <div>{errors.product[index].quantity}</div>
                              ) : null}
                            </div>
                            </div>
                           
                          </div>
                        ))}
                        {}
                      </div>
                    )}
                  </FieldArray>

                  <Button
                    variant="outlined"
                    type="submit"
                    style={{ marginTop: "24px" }}
                  >
                    Submit
                  </Button>
                </form>
              )}
            </Formik>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
