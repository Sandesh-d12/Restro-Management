const product = require("../Database/Modal/productdb");

async function getProducts() {
  try {
    const products = await product.getProducts();
    if (products.length > 0) {
      return products;
    }
    throw new Error("no product found");
  } catch (err) {
    throw err;
  }
}

// getProducts();

async function addProduct(name, price, quantity) {
  try {
    if (product.addProduct({ name, price, quantity })) {
      return "product added";
    } else {
      throw new Error("error occur");
    }
  } catch (err) {
    console.log(err.message);
    throw err;
  }
}
// addProduct('Momo', 150, 300)

async function updateProduct(productId, productInfo) {
  try {
    if (await product.updateProduct(productId, productInfo)) {
      return "product updated";
    }
    throw new Error("error while updating");
  } catch (err) {
    throw err;
  }
}

const data = { quantity: 60, price: 5000 };
updateProduct('65f023f8c8187944cd1cdb54',data )


module.exports = {
  getProducts,
  addProduct,
  updateProduct,
};
