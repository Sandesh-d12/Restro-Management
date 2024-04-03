const order = require("../Database/orderdb");
const productData = require("../Database/productdb");

// PLACE ORDER
async function placeOrder(table_number, payment, productId, quantity) {
  try {
  
  const product = await productData.getProductById(productId)
  total_cost = 0;
      total_cost += product.price * product.quantity;
      // order.decreaseQuantityOnStore(productId, quantity);
    // }
    const orderData = {
      table_number,
      payment,
      total_cost,
      product,
      quantity
    }
// console.log('oD',orderData)
    const result = await order.addOrder(orderData);

    if (result.acknowledged) {

        return { message: "order placed successfully", orderId: result.insertedId };
    }
    throw new Error("order failed");
  // }
} catch (err) {
    throw err;
  }
}
const payment = { type: "esewa", status: "paid" };
products={id:"65f023f8c8187944cd1cdb54",price:'456', quantity:'4'}
const id = ['65f0241b3768b8a73740eabe', '65f02425a6581ce199145770']

// placeOrder("16", payment, '65f0241b3768b8a73740eabe', '12');

// UPDATE PRODUCTS

async function getAll() {
  try {
    const res_user = await order.getOrder();
    if (res_user) {
      console.log("order::", res_user);
      return res_user;
    }
    throw new Error("error getting order");
  } catch (err) {
    console.log(err.message);
    throw err;
  }
}


module.exports={
  placeOrder,
  getAll
}