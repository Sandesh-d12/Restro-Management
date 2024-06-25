const DB = require("./config");
const mongodb = require("mongodb");

async function getProducts() {
  try {
    let db = await DB.db_connect("products");
    let products = await db.find().toArray();
    if (products) 
    return products;
  } catch (err) {
    throw err;
  }
}

// async function getProductById(id) {
//   try {
//     console.log(id)
//     let db = await DB.db_connect("products");
//     let products = await db.find({_id: new mongodb.ObjectId(id)}).toArray();
//     if (products) console.log(products);
//     return products;
//   } catch (err) {
//     throw err;
//   }
// }

async function getProductById(ids) {
  try {

    // const objectIds = ids.map(id => new mongodb.ObjectId(id));
    // console.log(objectIds)
    let db = await DB.db_connect("products");
    let products = await db.find({ _id: new mongodb.ObjectId(ids) }).toArray();
    if (products) 
    return products;
  } catch (err) {
    throw err;
  }
}

async function getProductByCategory(category) {
  try {

    // const objectIds = ids.map(id => new mongodb.ObjectId(id));
    // console.log(objectIds)
    let db = await DB.db_connect("products");
    let products = await db.find({ category:category }).toArray();
    if (products) 
    return products;
  } catch (err) {
    throw err;
  }
}

async function getCategoryByProductName(productName) {
  try {

    // const objectIds = ids.map(id => new mongodb.ObjectId(id));
    // console.log(objectIds)
    let db = await DB.db_connect("products");
    let products = await db.find({ name:productName }).toArray();
    if (products) {
      return products
    }
    throw new Error('product invalid')
   
  } catch (err) {
    throw err;
  }
}
//  getCategoryByProductName('Keaton Zamora')

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

async function getProductsById(productIds) {
  try {
    const db = await db_connect("products"); // Connect to 'products' database
    const collection = db.collection('products'); // Assuming 'products' is the collection name

    const query = { productId: { $in: productIds } };
    const products = await collection.find(query).toArray();

    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}


async function searchProductByKeyWords(keyword) {
  try {
    let db = await DB.db_connect("products");
    let allProduct = await db.find({}).toArray();

    const result = [];
    for (let products of allProduct) {
      for (let key in products) {
        if (key === "id") {
          continue;
        } else {
          if (
            typeof products[key] === "string" &&
            typeof keyword === "string"
          ) {
            if (
              products[key].toLowerCase().indexOf(keyword.toLowerCase()) !== -1
            ) {
              result.push(products);
              break;
            }
          }
        }
      }
    }
    if (result.length > 0) {
      return result;
    }
    throw new Error("no product found");
  } catch (err) {
    throw err;
  }
}





module.exports = {
  getProducts,
  addProduct,
  updateProduct,
  getProductById,
  getProductsById,
  getProductByCategory,
  getCategoryByProductName,
  searchProductByKeyWords
};
