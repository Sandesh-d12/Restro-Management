const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const userModal = require("./Modal/users/Users");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb://127.0.0.1:27017/resturant_management_system");

app.post("/createUser", (req, res) => {
  userModal
    .create(req.body)
    .then((createdUser) => {
      const responseUser = {
        _id: createdUser._id,
        firstName: createdUser.firstName,
        lastName: createdUser.lastName,
        email: createdUser.email,
        userType: createdUser.userType,
        password:createdUser.password,
        isLoginEnable: null,
      };
      res.send(responseUser)
      // res.json(responseUser);
      // JSON.parse(JSON.stringify(responseUser))
    })
    .catch((error) => {
      console.error("Error creating user:", error);
      res.status(500).json({ error: "Internal Server Error" });
      return error.message;
    });
});

app.post("/login", (req, res) => {
  const { email } = req.body;

  userModal
    .findOne({ email })
    .then((user) => {
      if (user) {
        const token = jwt.sign({ userId: user._id }, "bearer", {
          expiresIn: "30m",
        });
        res.json({
          message: "Login successful",
          user,
          token,
          isLoginEnable: true,
        });
      } else {

        res.status(404).json({ error: "User not found" });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: "Internal Server Error" });
    });
});

app.get("/logout", (req, res) => {
  const token = req.headers.authorization;
  console.log(token);
  if (token) {
    res.json({ message: "Logout successful", isLoginEnable: false });
  } else {
    console.log("User not found");
    res.status(404).json({ error: "User not found" });
  }
});

app.get("/getUsers", (req, res) => {
  userModal
    .find()
    .then(function (users) {
      res.json(users);
    })
    .catch(function (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

app.listen(3001, () => {
  console.log("Server is running");
});
