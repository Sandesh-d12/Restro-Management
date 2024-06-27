const express = require("express");
const router = express.Router();
router.use(express.json());
const productService = require("../Service/productService");

async function addNewProduct(req, res) {
  try {
    const data = req.body;
    const result = await productService.addProduct(
      data.name,
      data.price,
      data.quantity,
      data.category
    );
    res.status(200).send({message:result});
  } catch (err) {
    res.status(400).send(err.message);
  }
}

async function allProducts(req, res) {
  try {
    const data = req.body;
    const result = await productService.getProducts();
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json(err.message);
  }
}

async function updateProduct(req, res) {
  try {
    const productId = req.params.id;
    const data = req.body;
    const result = await productService.updateProduct(productId, data);
    res.status(200).send(result);
  } catch (err) {
    res.status(400).send(err.message);
  }
}

async function getProductByCategory(req, res) {
  try {
    const data = req.body;
    const result = await productService.getProductsByCategory(data.category);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json(err.message);
  }
}

async function searchProduct(req, res) {
  try {
    const keyword = req.params.keyword;
    const result = await productService.searchProduct(keyword);
    res.status(200).send(result);
  } catch (err) {
    res.status(401).json(err.message);
  }
}

async function removeProduct(req, res){
  try{
    const id = req.params.id
    const result = await productService.removeProduct(id);
    res.status(200).json(result);
  }catch(err){
    res.status(400).json(err.message);
  }
}


module.exports = {
  addNewProduct,
  allProducts,
  updateProduct,
  getProductByCategory,
  searchProduct,
  removeProduct
};
