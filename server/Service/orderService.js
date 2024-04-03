const order = require("../Database/orderdb");
const productData = require("../Database/productdb");
const cartData = require("../Database/cartdb");
const Schema = require("../models/orderModels");

// PLACE ORDER
async function placeOrder(user_id, payment, shipment) {
  try {
    total_cost = 0;
 
   
    // for (p of cartResult.products) {
      const product_result = await productData.checkProductOnStore(p.id);
      if (product_result.quantity < p.quantity) {
        throw new Error("not sufficient quantity on store");
      }
      total_cost += product_result.price * p.quantity;
      productData.decreaseQuantityOnStore(p.id, p.quantity);
    // }
    const result = await order.addOrder(orderData);
    if (result.acknowledged) {
      if (cartData.changeStatusOfCart(user_id)) {
        return { message: "order placed", orderId: result.insertedId };
      }
      throw new Error("error while deactivating cart");
    }
    throw new Error("order failed");
  } catch (err) {
    throw err;
  }
}
const payment = { type: "esewa", status: "paid" };
const shipment = {
  status: "awaiting",
  location_type: "national",
  address: {
    country: "Nepal",
    district: "Lalitpur",
    town: "Patan",
    house_number: 22446,
  },
};

// placeOrder("632444faeac7706c4242a1c6", payment,shipment);

// UPDATE PRODUCTS

async function updateProductOnOrder(id, product_id, quantity) {
  try {
    let product_res = await productData.checkProductOnStore(product_id);
    if (product_res.quantity < quantity) {
      throw new Error("not sufficient quantity on store");
    }
    const order = await order.findOrder(id);
    if (order) {
      for (product of order.products) {
        if (product.id === product_id) {
          product_res.quantity += product.quantity;
          order.total_cost -= product.quantity * product_res.price;

          product.quantity = quantity;
          order.total_cost += quantity * product_res.price;
          product_res.quantity -= quantity;

          if (await productData.updateStore(product_id, product_res)) {
            if (await order.updateOrder(id, order)) {
              return { message: "order updated successfully" };
            }
            throw new Error("error while updating order");
          }
          throw new Error("error while decreasing quantity on store");
        }
      }
    }
    throw new Error(`no order found for id: ${id}`);
  } catch (err) {
    throw err;
  }
}
// updateProductOnOrder(
//   "632878d560e2f9b5f2a48467",
//   "6324459dc0d23df40472bb56",
//   3
// );