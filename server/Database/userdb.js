const DB = require("./config");
const mongodb = require("mongodb");

async function getUsers() {
  try {
    let db = await DB.db_connect("users");
    let user = await db.find().toArray();
    if (user) 
    return user;
  } catch (err) {
    throw err;
  }
}
// getUsers()
async function findUserFromUserData(email, password) {
  try {
    let db = await DB.db_connect("users");
    let user = await db.findOne({ email: email });
    if (user) {
      if (email === user.email && password === user.password) return user;
    }
    throw new Error("invalid login details");
  } catch (err) {
    throw err;
  }
}

async function findUserFromEmail(email) {
  try {
    console.log('eeeee',email)
    let db = await DB.db_connect("users");
    let user = await db.findOne({ email: email });
console.log('useeer',user)
    if (user) {
      return user;
    }
    return false;
  } catch (err) {
    throw err;
  }
}
// findUserFromEmail('gisyjem@mailinator.com')


async function findUserFromId(id) {
  try {
    const u_id = new mongodb.ObjectId(id)
    console.log(u_id)
    let db = await DB.db_connect("users");
    let user = await db.findOne({ _id: u_id });
    if (user) {
      return user;
    } else {
      console.error(`User not found for ID: ${id}`);
      return false;
    }
  } catch (err) {
    console.error('Error in findUserFromId:', err);
    throw err;
  }
}


async function addUser(userData) {
  try {
    let db = await DB.db_connect("users");
    let user = await db.insertOne(userData);
    return user.acknowledged;
  } catch (err) {
    throw err;
  }
}


async function updateUser(userData, id) {
  try {
    let db = await DB.db_connect("users");
    const updatedUser = await db.findOneAndUpdate(
      { _id: new mongodb.ObjectId(id) },
      { $set: userData },
      { returnDocument: 'after' } 
    );

    if (!updatedUser) {
      throw new Error('User not found');
    }

    return updatedUser
  } catch (err) {
    throw err;
  }
}


async function deleteUser(email) {
  try {

    let db = await DB.db_connect("users");
    const user = await db.findOne({ email: email });
    if (!user) {
   throw new Error('user not found')
    }
if(user.userType === 'admin'){
  throw new Error('can not delete admin')
}
          const result = await db.deleteOne({ email: email});
   
      return result.acknowledged;
  } catch (err) {
    throw err;
  }
}
//  deleteUser('gykixejo@mailinator.com')
module.exports = {
  getUsers,
  findUserFromUserData,
  addUser,
  findUserFromEmail,
  deleteUser,
  findUserFromId,
  updateUser
};
