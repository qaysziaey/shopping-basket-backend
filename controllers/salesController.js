const express = require("express");
const cors = require("cors");
const Sales = require("../model/Sales");
const connect = require("../lib/connectDB");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connect(); // Database connection

// Create new sale
const createNewSale = async (req, res) => {
  try {
    const { productName, price, thumbnail } = req.body;
    const sale = new Sales({
      productName,
      price,
      thumbnail,
    });
    await sale.save();
    return res.json(sale);
  } catch (err) {
    res.status(500).send({ message: "Sale can not be created." });
  }
};

// Get all sales
const getAllSales = async (_, res) => {
  try {
    const sales = await Sales.find({});
    return res.json({ sales });
  } catch (err) {
    res.status(500).send({ message: "Sale not found" });
  }
};

module.exports = {
  createNewSale,
  getAllSales,
};
