const DB = require("./config");
const mongodb = require("mongodb");

async function getProducts() {
  try {
    let db = await DB.db_connect("products");
    let products = await db.find().toArray();
    if (products) 
    return products;
  } catch (err) {
    throw err;
  }
}

// async function getProductById(id) {
//   try {
//     console.log(id)
//     let db = await DB.db_connect("products");
//     let products = await db.find({_id: new mongodb.ObjectId(id)}).toArray();
//     if (products) console.log(products);
//     return products;
//   } catch (err) {
//     throw err;
//   }
// }

async function getProductById(ids) {
  try {

    // const objectIds = ids.map(id => new mongodb.ObjectId(id));
    // console.log(objectIds)
    let db = await DB.db_connect("products");
    let products = await db.find({ _id: new mongodb.ObjectId(ids) }).toArray();
    if (products) 
    return products;
  } catch (err) {
    throw err;
  }
}

async function addProduct(productData) {
  try {
    let db = await DB.db_connect("products");
    let product = await db.insertOne(productData);
    if (product) console.log(product);
    return product;
  } catch (err) {
    throw err;
  }
}

async function updateProduct(productId, productInfo) {
  try {
    let db = await DB.db_connect("products");
    const product = await db.findOne({ _id: new mongodb.ObjectId(productId) });
    if (product) {
      const result = await db.updateOne(
        { _id: new mongodb.ObjectId(productId) },
        { $set: productInfo }
      );
      return result.acknowledged;
    }
    throw new Error("No Product Found for Id");
  } catch (err) {
    throw err;
  }
}

async function getProductsById(productIds) {
  try {
    const db = await db_connect("products"); // Connect to 'products' database
    const collection = db.collection('products'); // Assuming 'products' is the collection name

    const query = { productId: { $in: productIds } };
    const products = await collection.find(query).toArray();

    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}




module.exports = {
  getProducts,
  addProduct,
  updateProduct,
  getProductById,
  getProductsById
};
