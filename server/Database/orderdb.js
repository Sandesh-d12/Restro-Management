var MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/PHASE1";
const DB = require("./config");
const mongodb = require("mongodb");

async function getOrder() {
  try {
    let db = await DB.db_connect("orders");
    let orders = await db.find().toArray();
    return orders;
  } catch (err) {
    throw err;
  }
}

async function addOrder(order) {
  try {
    let db = await DB.db_connect("orders");
    let result = await db.insertOne(order);
    return result;
  } catch (err) {
    throw err;
  }
}

async function findOrder(order_id) {
  try {
    console.log(order_id);
    let db = await DB.db_connect("orders");

    const order = await db.findOne({ _id: new mongodb.ObjectId(order_id) });
    console.log(order);
    if (order) return order;
    throw new Error(`No Order Found For Id :${order_id}`);
  } catch (err) {
    throw err;
  }
}

async function updateOrder(order_id, new_order) {
  try {
    let db = await DB.db_connect("orders");
    const order = await db.findOne({ _id: new mongodb.ObjectId(order_id) });
    if (order) {
      const result = await db.updateOne(
        { _id: new mongodb.ObjectId(order_id) },
        { $set: new_order }
      );
      return result.acknowledged;
    }
    // throw new Error("Error  Updating Order");
    return false;
  } catch (err) {
    throw err;
  }
}

async function decreaseQuantityOnStore(product_id, quantity) {
  console.log(product_id, quantity);
  try {
    let db = await DB.db_connect("products");
    const product = await db.findOne({ _id: new mongodb.ObjectId(product_id) });
    if (product) {
      const res = await db.updateOne(
        { _id: new mongodb.ObjectId(product_id) },
        { $set: { quantity: product.quantity - quantity } }
      );
      return res.acknowledged;
    }
    throw new Error("no product found for id:" + product_id);
  } catch (err) {
    throw err;
  }
}

async function getProductById(ids) {
  try {

    // const objectIds = ids.map(id => new mongodb.ObjectId(id));
    // console.log(objectIds)
    let db = await DB.db_connect("products");
    let products = await db.find({ _id: new mongodb.ObjectId(ids) }).toArray();
    if (products) return products;
  } catch (err) {
    throw err;
  }
}

async function deleteOrder(id) {
  try {
    let db = await DB.db_connect("orders");
    const order = await db.findOne({ _id: new mongodb.ObjectId(id) });
    if (!order) {
      throw new Error("order not found");
    }
    const result = await db.deleteOne({ _id: new mongodb.ObjectId(id)});

    return result.acknowledged;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  getOrder,
  addOrder,
  findOrder,
  updateOrder,
  decreaseQuantityOnStore,
  getProductById,
  deleteOrder
};
