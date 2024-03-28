const user = require("../Database/Modal/userdb");
const userModal = require("../Database/Modal/users/Users");

async function signIn(email, password) {
  try {
    const data = await user.findUserFromUserData(email, password);
    console.log(data);
    return data;
  } catch (err) {
    console.log(err.message);
    throw err;
  }
}

// signIn('sandesh.dhakal@smaitic.com', '12345')

async function signUp(firstName, lastName, email, password, userType) {
  try {
    // console.log(firstName, lastName, email, password, userType)
    //   const customer = userModal(firstName, lastName, email, password,userType);
    if (await user.findUserFromEmail(email)) {
      throw new Error("email already exists");
    }
    if (
      await user.addUser({ firstName, lastName, email, password, userType })
    ) {
      console.log("user added");
      return "successfully signed up";
    } else {
      throw new Error("error while adding account");
    }
  } catch (err) {
    console.log(err.message);
    throw err;
  }
}

  // signUp('sand', 'esh', 's1@gmail.com', 'abc', 'admin')

async function removeUser(email) {
  try {
  
//     const selectedUser = await user.findUserFromEmail(email)

//     const role = selectedUser?.userType
//     const id = selectedUser._id
// console.log(selectedUser)
    // if(role == 'waiter' || role == 'cashier'){
      await user.deleteUser(email)
      return "user removed successfully";
    // }else{
    //   return 'can not delete user';
    // }
  } catch (err) {
    throw err;
  }
}
// removeUser('nyfo@mailinator.com')

async function updateUser(userInfo, id) {
  try {
   const a = await user.updateUser(id, userInfo)
   if (a){
    console.log(a)
    return a
   }
    throw new Error("error while updating user")
  } catch (err) {
    throw err;
  }
}
const data={
  firstName:'Sandes1',
  lastName:'random',
}
// updateUser('65f6ab1ded00f65a7de14f68', data)

async function getAll() {
  try {
    const users = await user.getUsers();
    return users;
  } catch (err) {
    throw err;
  }
}

//   removeUser('65ad0e7d8df27b177691903e')

module.exports = {
  signIn,
  signUp,
  removeUser,
  getAll,
  updateUser
};
