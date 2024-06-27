const order = require("../Database/orderdb");
const productData = require("../Database/productdb");

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

async function getOrderById(id) {
  console.log("idd", id);
  try {
    const res_user = await order.getOrderById(id);
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
    await order.deleteOrder(id);
    return "order removed successfully";
  } catch (err) {
    throw err;
  }
}

async function placeOrder(table_number, payment, products) {
  try {
    let total_cost = 0;
console.log('pddd',products)
    for (const product of products) {
      const result = await order.decreaseQuantityOnStore(product._id, product.quantity);
      if (result) {
        total_cost += product.price * product.quantity;
      } else {
        throw new Error('Order quantity should not be greater than available quantity');
      }
    }

    const paymentDetails = {
      type: payment?.type,
      status: payment?.status,
    };

    const orderData = {
      table_number,
      paymentDetails,
      total_cost,
      product: products.map((product) => ({
        id: product._id,
        name: product.name,
        price: product.price,
        quantity: product.quantity,
        category: product.category,
      })),
    };

    const result = await order.addOrder(orderData);

    if (result.acknowledged) {
      return {
        message: "Order placed successfully",
        orderId: result.insertedId,
      };
    } else {
      throw new Error("Failed to place order");
    }
  } catch (error) {
    throw error;
  }
}


async function updateOrder(orderId, orderInfo) {
  const { id, ...data } = orderInfo;
  let total_cost = 0;
  const paymentDetails = {
    type: orderInfo.paymentDetails?.type,
    status: orderInfo.paymentDetails?.status,
  };

  try {

    for (const product of data.product) {
      const result = await order.decreaseQuantityOnStore(product.id, product.quantity);
      if (result) {
        total_cost += product.price * product.quantity;
      } else {
        throw new Error('Order quantity should not be greater than available quantity');
      }
    }
    const orderData = {
      product: data.product,
      paymentDetails,
      total_cost
    };

    if (await order.updateOrder(orderId, orderData)) {
      return "Order updated successfully";
    } else {
      throw new Error("Error while updating order");
    }
  } catch (err) {
    throw err;
  }
}


module.exports = {
  placeOrder,
  getAll,
  removeOrder,
  updateOrder,
  getOrderById,
};
