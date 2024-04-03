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

//   addTable('5', '8', '4')


async function updateTable(tableInfo, id) {
    try {
     const a = await table.updateTable(id, tableInfo)
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
//   updateTable('660ab447156bbfb6d5941795', data)

async function getAll() {
  try {
    const users = await table.getAllTables();
    return users;
  } catch (err) {
    throw err;
  }
}

  module.exports={
    addTable,
    updateTable,
    getAll
  }