const express = require("express");
const router = express.Router();
router.use(express.json());
const tableService = require("../Service/tableService");

async function addTable(req, res) {
    try {
      const data = req.body;
  
      const result = await tableService.addTable(
        data.tableNumber,
        data.tableCapacity,
        data.occupancy,
      );
      res.status(200).send({ data: result });
    } catch (err) {
      res.status(400).send({ data: err.message });
    }
  }

  async function updateTable(req, res) {
    try {
      const table_id = req.params.id;
      const data = req.body;
      const result = await tableService.updateTable(table_id, data);
      res.status(200).send(result);
    } catch (err) {
      res.status(400).send(err.message);
    }
  }

  async function getAll(req, res) {
    try {
      const result = await tableService.getAll();
      res.status(200).json(result);
    } catch (err) {
      res.status(400).json(err.message);
    }
  }
  
  module.exports={
    addTable,
    updateTable,
    getAll
  }