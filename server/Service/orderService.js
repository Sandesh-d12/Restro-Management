const order = require("../Database/orderdb");
const productData = require("../Database/productdb");

// PLACE ORDER
async function placeOrder(table_number, payment, productId, quantity) {
  try {
  
  // const products= await productData.getProductById(productId)
  // const product = products && products.filter((d)=>d.quantity)
  const products = await productData.getProductById(productId);
const product = products.map(product => {
  // Destructure the product object and remove the "quantity" property
  const { quantity, ...productWithoutQuantity } = product;
  return productWithoutQuantity;
});
  console.log('pppp',product)
  total_cost = 0;
      total_cost += product.price * product.quantity;

    const orderData = {
      table_number,
      payment,
      total_cost,
      product,
      quantity
    }
    const result = await order.addOrder(orderData);
    if (result.acknowledged) {
        return { message: "order placed successfully", orderId: result.insertedId };
    }
    throw new Error("order failed");
} catch (err) {
    throw err;
  }
}
const payment = { type: "esewa", status: "paid" };
products={id:"65f023f8c8187944cd1cdb54",price:'456', quantity:'4'}
const id = ['65f0241b3768b8a73740eabe', '65f02425a6581ce199145770']

// placeOrder("16", payment, '65f0241b3768b8a73740eabe', '12');

// GET ALL ORDER
async function getAll() {
  try {
    const res_user = await order.getOrder();
    if (res_user) {

      return res_user;
    }
    throw new Error("error getting order");
  } catch (err) {
    console.log(err.message);
    throw err;
  }
}

async function removeOrder(id) {
  try {

      await order.deleteOrder(id)
      return "order removed successfully";
  } catch (err) {
    throw err;
  }
}


module.exports={
  placeOrder,
  getAll,
  removeOrder
}