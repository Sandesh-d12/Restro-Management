const table = require("../Database/tabledb");

async function addTable(tableNumber, tableCapacity) {
    try {
    if (
      await table.addTable({ tableNumber, tableCapacity, occupancy:0 })
    ) {
      console.log("table added");
      return "table added successfully";
    } else {
      throw new Error("error while adding table");
    }
    } catch (err) {
      console.log(err.message);
      throw err;
    }
  }

async function updateTable(tableInfo, id) {
  const {tableId, ...tableData} = tableInfo;
    try {
     const a = await table.updateTable(tableId, tableData)
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
tableCapacity:"10",
tableNumber:"6"
  }

async function getAll() {
  try {
    const users = await table.getAllTables();
    return users;
  } catch (err) {
    throw err;
  }
}

async function removeTable(id) {
  try {

      await table.deleteTable(id)
      return "table removed successfully";
  } catch (err) {
    throw err;
  }
}

  module.exports={
    addTable,
    updateTable,
    getAll,
    removeTable
  }