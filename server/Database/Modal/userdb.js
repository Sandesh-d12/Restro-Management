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
    console.log(email)
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
// findUserFromEmail('sandesh.dhakal@smaitic.com')
// async function findUserFromId(user_id) {
//   try {
//     let db = await DB.db_connect("users");
//     console.log(user_id)
//     let user = await db.findOne({ _id: new mongodb.ObjectId(user_id) });
//     console.log('user',user)
//     if (user) {
//       return user;
//     }
//     return false;
//   } catch (err) {
//     throw err;
//   }
// }

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


// async function findUserFromId(id) {
//   try {
//     // Validate the id format
//     if (!mongodb.ObjectId.isValid(id)) {
//       console.error('Invalid ID format');
//       return false;
//     }

//     let db = await DB.db_connect("users");
//     let user = await db.findOne({ _id: new mongodb.ObjectId(id) });

//     if (user) {
//       return user;
//     } else {
//       console.error('User not found');
//       return false;
//     }
//   } catch (err) {
//     console.error('Error in findUserFromId:', err);
//     throw err;
//   }
// }

//  findUserFromId('65f025dfad123b33894e6c20');
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


async function deleteUser(user_id) {
  try {
    let db = await DB.db_connect("users");
    const user = await findUserFromEmail(user_id)
    console.log(user)
    if (user && user.userType !== 'admin') {

      const result = await db.deleteOne({ email: user_id });
      return result.acknowledged;
    }
    throw new Error("error while removing user");
  } catch (err) {
    throw err;
  }
}

module.exports = {
  getUsers,
  findUserFromUserData,
  addUser,
  findUserFromEmail,
  deleteUser,
  findUserFromId,
  updateUser
};
