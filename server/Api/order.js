const express = require("express");
const router = express.Router();
router.use(express.json());
const orderService = require("../Service/orderService");

async function placeOrder(req, res) {
  try {
    const data = req.body;

    const result = await orderService.placeOrder(
      data?.table_number,
      data?.paymentType,
      data?.product,
     
    );
    res.status(200).send(result);
  } catch (err) {
    res.status(400).send(err.message);
  }
}

async function allOrder(req, res) {
  try {
    const result = await orderService.getAll();
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json(err.message);
  }
}


async function removeOrder(req, res){
  try{

    const result = await orderService.removeOrder(req?.body?.id);
    res.status(200).json(result);
  }catch(err){
    res.status(400).json(err.message);
  }
}

async function updateOrder(req, res) {
  try {
 
    const data = req.body;
 
    const result = await orderService.updateOrder(data.id, data);
    res.status(200).send(result);
  } catch (err) {
    res.status(400).send(err.message);
  }
}

async function getOrder(req, res) {
  try {

    const id = req.params.id
    const result = await orderService.getOrderById(id);
    res.status(200).send(result);
  } catch (err) {
    res.status(400).send(err.message);
  }
}

module.exports = {
    placeOrder,
    allOrder,
    removeOrder,
    updateOrder,
    getOrder
  };