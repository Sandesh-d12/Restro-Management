const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  userType: String,
  isLoggedIn: Boolean,
  password:String
});
const userModal = mongoose.model("users", userSchema);

module.exports = userModal;
