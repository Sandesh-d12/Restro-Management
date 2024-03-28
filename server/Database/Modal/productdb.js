const DB = require("./config");
const mongodb = require("mongodb");

async function getProducts() {
  try {
    let db = await DB.db_connect("products");
    let products = await db.find().toArray();
    if (products) console.log(products);
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


module.exports = {
  getProducts,
  addProduct,
  updateProduct,
};
