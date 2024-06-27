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


async function decreaseQuantityOnStore(product_id, quantity) {
  try {
    let db = await DB.db_connect("products");
    const product = await db.findOne({ _id: new mongodb.ObjectId(product_id) });
    if (product) {
      let qt = product.quantity - quantity;
      if (qt >= 0) { 
        const res = await db.updateOne(
          { _id: new mongodb.ObjectId(product_id) },
          { $set: { quantity: qt } } 
        );
        console.log(res);
        return res.acknowledged;
      } else {
        throw new Error('Not enough items available in store');
      }
    } else {
      throw new Error(`No product found for id: ${product_id}`);
    }
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

async function getOrderById(id) {
  try {

    let db = await DB.db_connect("orders");
    let order = await db.find({ _id: new mongodb.ObjectId(id) }).toArray()
    if (order) return order;
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

async function updateOrder(orderId, orderInfo) {
  try {
    let db = await DB.db_connect("orders");
    const order = await db.findOne({ _id: new mongodb.ObjectId(orderId) });
    if (order) {
      const result = await db.updateOne(
        { _id: new mongodb.ObjectId(orderId) },
        { $set: orderInfo }
      );
      return result.acknowledged;
    }
    throw new Error("No Order Found for Id");
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
  deleteOrder,
  getOrderById
};
