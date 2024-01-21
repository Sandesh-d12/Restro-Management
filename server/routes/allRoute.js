const router = require("express").Router();
const userApi = require("../Api/users");

router.post("/user/addUser", userApi.addUser);
router.post("/user/login", userApi.logIn);
router.get("/user/getUsers", userApi.getAll);

module.exports = router;
