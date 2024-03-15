const express = require("express");
const cors = require("cors");
const User = require("../model/Users");
const Product = require("../model/Products");
const connect = require("../lib/connectDB");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connect(); // Database connection

// Welcome screen
const welcomeScreen = (req, res) => {
  res.send({
    message: "Welcome to our Shopping Basket API",
    API: "https://shopping-basket-backend-u4xp.onrender.com/products",
  });
};

// Create a new Product
const createNewProduct = async (req, res) => {
  try {
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
    const newProduct = await Product.create(product);

    return res.json(newProduct);
  } catch (err) {
    res.status(500).send({ message: "Product can not be created." });
  }
};

// Delete a Product
const deleteProduct = async (req, res) => {
  const { productId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(404).send({ message: "Product not found." }).end();
  }
  try {
    const product = await Product.findByIdAndDelete({ _id: productId });
    if (!product) {
      return res.json({ message: "Product not found." });
    }
    res.json(product);
  } catch (error) {
    res.status(500).send({ message: "Product not found" });
  }
};

// Get all products
const getAllProducts = async (_, res) => {
  try {
    const product = await Product.find({});
    return res.json({ product });
  } catch (err) {
    res.status(500).send({ message: "Product not found" });
  }
};

// Get a single Product by id
const getProductById = async (req, res) => {
  const { productId } = req.params;

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

// Get a single Product by Name
const getProductByName = async (req, res) => {
  const { productName } = req.params;
  if (!productName) {
    return res.status(404).send({ message: "Product not found." }).end();
  }
  try {
    const productDetails = await Product.findOne({
      productName: { $regex: productName, $options: "i" },
    });
    if (!productDetails) {
      return res.json({ message: "Product not found." });
    }
    res.json(productDetails);
  } catch (error) {
    res.status(500).send({ message: "Product not found" });
  }
};

module.exports = {
  welcomeScreen,
  createNewProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  getProductByName,
};
