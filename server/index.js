const express = require("express");
const cors = require("cors");
const router = require("../server/routes/allRoute");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", router);
const PORT = process.env.PORT;

app.listen(PORT, (err) => {
  if (err) {
    return console.log("ERROR", err);
  } else {
    console.log("Server Started on port:" + PORT);
  }
});
