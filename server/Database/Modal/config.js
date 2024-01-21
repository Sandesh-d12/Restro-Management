const url = "mongodb://127.0.0.1:27017/resturant_management_system";

const { MongoClient } = require("mongodb");

const client = new MongoClient(url);
const database = "resturant_management_system";

const db_connect = async function (collection) {
  try{
    let result = await client.connect();
    let db = result.db(database);
    return db.collection(collection);
  }catch(error){
    console.log('Error connecting database::', error)
  }
 
};
module.exports = { db_connect };
