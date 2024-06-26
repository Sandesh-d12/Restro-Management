import * as React from "react";
import * as Yup from "yup";
import { Formik, FieldArray } from "formik";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CustomButton from "./table-management/Table";
import { RiPencilFill } from "react-icons/ri";
import { getOrder, useUpdateOrder } from "../features/react-query/order";
import { useSearchParams } from "react-router-dom";
import { categoryOptions } from "../features/product/AddProduct";
import { Button } from "@mui/material";
import {
  getProductsByCategory,
  useGetProducts,
} from "../features/react-query/products";

const style = {
  position: "absolute",
  top: "50%",
  left: "150%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  width: "1000px",
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
        sx={{ width: "700px !important" }}
      >
        <Box sx={style}>
          <div>
            <h1>Order Form</h1>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                const data = {
                  ...values,
                  id: id,
                };
                updateOrder.mutate(data);
                setOpen(false);
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
                  <label htmlFor="paymentDetails.type">Payment Type</label>
                  <select>
                    {options.map((item) => (
                      <option
                        value={item.key}
                        initialValues={values.paymentDetails.type}
                      >
                        {item.value}
                      </option>
                    ))}
                  </select>
                  <br />

                  <label htmlFor="paymentDetails.status">Payment Status</label>
                  <select
                    id="paymentDetails.status"
                    name="paymentDetails.status"
                    onChange={handleChange}
                    value={values.paymentDetails.status}
                    disabled={disableCategory}
                    style={{ height: "40px", padding: "0px", width: "100%" }}
                  >
                    <option value="pending">Pending</option>
                    <option value="paid">Paid</option>
                  </select>
                  <br />
                  <FieldArray name="product">
                    {({ push, remove }) => (
                      <div>
                        <h2>Products</h2>
                        {values?.product?.map((item, index) => (
                          <div key={index} style={{ display: "flex" }}>
                            <div
                              style={{ display: "flex", flexDirection: "row" }}
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
                              />
                              {errors.product?.[index]?.category &&
                              touched.product?.[index]?.category ? (
                                <div>{errors.product[index].category}</div>
                              ) : null}
                            </div>
                            <div>
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
                            <div>
                              <label htmlFor={`product.${index}.quantity`}>
                                Quantity
                              </label>
                              <input
                                id={`product.${index}.quantity`}
                                name={`product.${index}.quantity`}
                                type="number"
                                onChange={handleChange}
                                value={item.quantity}
                              />
                              {errors.product?.[index]?.quantity &&
                              touched.product?.[index]?.quantity ? (
                                <div>{errors.product[index].quantity}</div>
                              ) : null}
                            </div>
                            <button type="button" onClick={() => remove(index)}>
                              Remove
                            </button>
                          </div>
                        ))}
                        {}
                        <button
                          type="button"
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
                          Add Product
                        </button>
                      </div>
                    )}
                  </FieldArray>

                  <button type="submit">Submit</button>
                </form>
              )}
            </Formik>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
