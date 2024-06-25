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
    let user = await db.findOne({ tableNumber: id });

    if (user) {

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

async function updateTable(id, tableData) {
  try {
    let db = await DB.db_connect("tables");
    const updatedTable = await db.findOneAndUpdate(
      { _id: new mongodb.ObjectId(id) },
      { $set: tableData },
      { returnDocument: "after" }
    );

    if (!updatedTable) {
      throw new Error("table not found");
    }

    return updatedTable;
  } catch (err) {
    throw err;
  }
}

async function deleteTable(id) {
  console.log('tnnn',id)
  try {

    let db = await DB.db_connect("tables");
    const table = await db.findOne({ _id: new mongodb.ObjectId(id) });

    if (!table) {
      throw new Error("table not found");
    }
    const result = await db.deleteOne({ _id: new mongodb.ObjectId(id) });

    return result.acknowledged;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  getAllTables,
  findTableFromTableNumber,
  addTable,
  updateTable,
  deleteTable
};
