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
    products.forEach((product) => {
      total_cost += product.price * product.quantity;
    });

    const paymentDetails = {
      type: payment?.type,
      status: payment?.status,
    };

    const orderData = {
      table_number,
      paymentDetails,
      total_cost,
      product: products.map((product) => ({
        _id: product._id,
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

  try {
    if (await order.updateOrder(orderId, data)) {
      return "order updated";
    }
    throw new Error("error while updating");
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
