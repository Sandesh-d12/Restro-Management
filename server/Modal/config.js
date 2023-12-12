

const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/formik/";

const client = new MongoClient(url)

async function connect(){
    let result = await client.connect()
   let db =  result.db('formik')
   let collection = db.collection('users')
   console.log(collection.find({}).toArray())
}

connect()
// module.exports{connection}function