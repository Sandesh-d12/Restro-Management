const router = require("express").Router();
const userApi = require("../Api/users");
const productApi = require("../Api/products");

// USER
router.post("/user/addUser", userApi.addUser);
router.post("/user/login", userApi.logIn);
router.get("/user/getUsers", userApi.getAll);
router.delete("/user/removeUser/:id", userApi.removeUser);
router.post("/user/updateUser/:id", userApi.updateUser);

//PRODUCT
router.post("/product/addNewProduct", productApi.addNewProduct);
router.get("/product/allProducts", productApi.allProducts);
router.post("/product/updateProduct/:id", productApi.updateProduct);

module.exports = router;
