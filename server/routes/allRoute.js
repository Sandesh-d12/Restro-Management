const router = require("express").Router();
const userApi = require("../Api/users");
const productApi = require("../Api/products");
const tableApi = require('../Api/table')
const orderApi = require('../Api/order')

// USER
router.post("/user/addUser", userApi.addUser);
router.post("/user/login", userApi.logIn);
router.get("/user/getUsers", userApi.getAll);
router.post("/user/removeUser", userApi.removeUser);
router.post("/user/updateUser/:id", userApi.updateUser);

//PRODUCT
router.post("/product/addNewProduct", productApi.addNewProduct);
router.get("/product/allProducts", productApi.allProducts);
router.post("/product/updateProduct/:id", productApi.updateProduct);
router.post("/product/getProductByCategory", productApi.getProductByCategory);
router.get("/product/searchProduct/:keyword", productApi.searchProduct);


//TABLE
router.post("/table/addTable", tableApi.addTable);
router.get("/table/getAll", tableApi.getAll)
router.post("/table/updateTable", tableApi.updateTable);
router.post("/table/removeTable", tableApi.removeTable);


//ORDER
router.post("/order/addOrder", orderApi.placeOrder);
router.get("/order/allOrder", orderApi.allOrder);
router.post("/order/removeOrder", orderApi.removeOrder);
router.post("/order/updateOrder", orderApi.updateOrder);
router.get("/order/getOrder/:id", orderApi.getOrder);

module.exports = router;


