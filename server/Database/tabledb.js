const DB = require("./config");
const mongodb = require("mongodb");

async function getAllTables() {
  try {
    const db = await DB.db_connect("tables");
    let user = await db.find().toArray();
    if (user) console.log(user);
    return user;
  } catch (err) {
    throw err;
  }
}

async function findTableFromTableNumber(id) {
    try {

      let db = await DB.db_connect("tables");
      let user = await db.findOne({tableNumber: id });
      console.log('user',user)
      if (user) {
        console.log('user',user)
        return user;
      }
      return false;
    } catch (err) {
      throw err;
    }
  }

  async function addTable(tableData) {
    try {
      let db = await DB.db_connect("tables");
      let user = await db.insertOne(tableData);
      return user.acknowledged;
    } catch (err) {
      throw err;
    }
  }

  async function updateTable(tableData, id) {
    try {
      let db = await DB.db_connect("tables");
      const updatedTable = await db.findOneAndUpdate(
        { _id: new mongodb.ObjectId(id) },
        { $set: tableData },
        { returnDocument: 'after' } 
      );
  
      if (!updatedTable) {
        throw new Error('User not found');
      }
  
      return updatedTable
    } catch (err) {
      throw err;
    }
  }
  

  module.exports={
    getAllTables, findTableFromTableNumber, addTable, updateTable
  }