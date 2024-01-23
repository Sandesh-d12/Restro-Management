const DB = require("./config");

const mongodb = require("mongodb");

async function getUsers() {
  try {
    let db = await DB.db_connect("users");
    let user = await db.find().toArray();
    if (user) console.log(user);
    return user;
  } catch (err) {
    throw err;
  }
}

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
    let db = await DB.db_connect("users");
    let user = await db.findOne({ email: email });
    if (user) {
      return user;
    }
    return false;
  } catch (err) {
    throw err;
  }
}

async function findUserFromId(id) {
  try {
    let db = await DB.db_connect("users");
    console.log(id)
    let user = await db.findOne({ _id: new mongodb.ObjectId(id) });
    console.log('user',user)
    if (user) {
      return user;
    }
    return false;
  } catch (err) {
    throw err;
  }
}
 findUserFromId('65ad0ecb0910953cebf3864d');
async function addUser(userData) {
  try {
    let db = await DB.db_connect("users");
    console.log("userData", userData);
    let user = await db.insertOne(userData);
    return user.acknowledged;
  } catch (err) {
    throw err;
  }
}

async function removeUser(user_id) {
  try {
    let db = await DB.db_connect("users");
    // const user = await db.findOne({ _id: new mongodb.ObjectId(user_id) });
    // if (user) {
      const result = await db.deleteOne({ _id: new mongodb.ObjectId(user_id) });
      return result.acknowledged;
    // }
    // throw new Error("error while removing product");
  } catch (err) {
    throw err;
  }
}

module.exports = {
  getUsers,
  findUserFromUserData,
  addUser,
  findUserFromEmail,
  removeUser,
  findUserFromId
};
