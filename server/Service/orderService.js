const order = require("../Database/orderdb");
const productData = require("../Database/productdb");

// PLACE ORDER
// async function placeOrder(table_number, payment, products) {
//   try {
//     const productId = products.map(product => product.productId);
//   // const products= await productData.getProductById(productId)
//   // const product = products && products.filter((d)=>d.quantity)
//   const products = await productData.getProductById(productId);
// const product = products.map(product => {
//   // Destructure the product object and remove the "quantity" property
//   const { quantity, ...productWithoutQuantity } = product;
//   return productWithoutQuantity;
// });
//   console.log('pppp',product)
//   total_cost = 0;
//       total_cost += product.price * product.quantity;

//     const orderData = {
//       table_number,
//       payment,
//       total_cost,
//       product,
//       quantity
//     }
//     const result = await order.addOrder(orderData);
//     if (result.acknowledged) {
//         return { message: "order placed successfully", orderId: result.insertedId };
//     }
//     throw new Error("order failed");
// } catch (err) {
//     throw err;
//   }
// }
const payment = { type: "esewa", status: "paid" };
products=[{id:"65f023f8c8187944cd1cdb54",price:'456', quantity:'4'}]
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



async function placeOrder(table_number, payment, products) {
console.log('pay',payment)
  try {
    // Calculate total_cost based on products
    let total_cost = 0;
    products.forEach(product => {
      total_cost += product.price * product.quantity;
    });

    // Construct payment object
    const paymentDetails = {
      type: payment?.type,
      status: payment?.status
    };

    // Construct orderData object
    const orderData = {
      table_number,
      paymentDetails,
      total_cost,
      product: products.map(product => ({
        _id: product._id, // Assuming _id is already in the product object
        name: product.name,
        price: product.price,
        quantity: product.quantity,
        category: product.category // Assuming category is already in the product object
      }))
    };

    // Example of adding order using order.addOrder (replace with your actual logic)
    const result = await order.addOrder(orderData);

    // Check if order was successfully added
    if (result.acknowledged) {
      return { message: "Order placed successfully", orderId: result.insertedId };
    } else {
      throw new Error("Failed to place order");
    }
  } catch (error) {
    throw error;
  }
}




module.exports={
  placeOrder,
  getAll,
  removeOrder
}