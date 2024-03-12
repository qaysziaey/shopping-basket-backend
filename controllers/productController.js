const express = require("express");
const cors = require("cors");
const User = require("../model/User");
const Product = require("../model/Product");
const connect = require("../lib/connectDB");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Get all products
const getAllProducts = async (req, res) => {
  await connect();
  const product = await Product.find({});
  //   console.log(data);
  return res.json({ numberOfProducts: product.length, product });
};

// Get a single Product by id
const getProductById = async (req, res) => {
  await connect();

  const { productId } = req.params;
  console.log(productId);

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(404).send({ message: "Product not found." }).end();
  }
  try {
    const productDetails = await Product.findById({ _id: productId });
    if (!productDetails) {
      return res.json({ message: "Product not found." });
    }
    res.json(productDetails);
  } catch (error) {
    res.status(500).send({ message: "User not found" });
  }
};

module.exports = { getAllProducts, getProductById };
