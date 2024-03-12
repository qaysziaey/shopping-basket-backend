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

  try {
    if (
      !productName ||
      !description ||
      !price ||
      !availableInStock ||
      !thumbnail ||
      !size ||
      !color ||
      !delivery ||
      !category ||
      !rating ||
      !vatText ||
      !about
    ) {
      return res.status(400).send({ message: "All fields are required" });
    }
    const newProduct = {
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
    };
    const product = await Product.create(newProduct);
    return res.status(201).json({ product: product });
  } catch (err) {
    return res.status(400).json({ message: "Product can not be created." });
  }
};

// Get all products
const getAllProducts = async (req, res) => {
  await connect();
  const product = await Product.find();
  //   console.log(data);
  return res.json({ product });
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

module.exports = { createNewProduct, getAllProducts, getProductById };
