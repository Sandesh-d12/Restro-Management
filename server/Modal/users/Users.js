const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
   firstName:String, 
    lastName:String,
    email:String,
    isLoggedIn:Boolean
}
  

)
const userModal = mongoose.model('users', userSchema)





module.exports= userModal