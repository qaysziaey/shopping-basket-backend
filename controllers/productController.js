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

// Establish the database connection once when the server starts
connect();

// Create a new Product
const createNewProduct = async (req, res) => {
  await connect();
  const {
    productName,
    description,
    price,
    availableInStock,
    thumbnail,
    size,
    color,
    delivery,
    category,
    rating,
    vatText,
    about,
  } = req.body;
  const product = new Product({
    productName,
    description,
    price,
    availableInStock,
    thumbnail,
    size,
    color,
    delivery,
    category,
    rating,
    vatText,
    about,
  });
  await product.save();
  return res.json(product);
};

// Get all products
const getAllProducts = async (req, res) => {
  await connect();
  try {
    const products = await Product.find({});
    if (!products) {
      return res.json({ message: "Product not found." });
    }
    return res.json(products);
  } catch (error) {
    res.status(500).send({ message: "User not found" });
  }
};

// Get a single Product by id
const getProductById = async (req, res) => {
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

module.exports = { createNewProduct, getAllProducts, getProductById };
