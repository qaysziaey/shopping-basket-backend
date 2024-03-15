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

// Create new user
const createNewUser = async (req, res) => {
  try {
    const { userName, email, password, profileImg } = req.body;
    const user = new User({
      userName,
      email,
      password,
      profileImg,
    });
    await user.save();
    return res.json(user);
  } catch (err) {
    res.status(500).send({ message: "User can not be created." });
  }
};

// Get all Users
const getAllUsers = async (req, res) => {
  try {
    const user = await User.find({});
    return res.json(user);
  } catch (err) {
    res.status(500).send({ message: "User not found." });
  }
};

// Get a single User by id
const getUserById = async (req, res) => {
  const { userId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(404).send({ message: "User not found." }).end();
  }
  try {
    const user = await User.findById({ _id: userId });
    if (!user) {
      return res.json({ message: "User not found." });
    }
    res.json(user);
  } catch (error) {
    res.status(500).send({ message: "User not found" });
  }
};

// Add product to cart
const addProductToBasket = async (req, res) => {
  const { userId, productId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(404).send({ message: "User not found." }).end();
  }
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(404).send({ message: "Product not found." }).end();
  }
  try {
    const user = await User.findById({ _id: userId });
    if (!user) {
      return res.json({ message: "User not found." });
    }
    user.cartItem.push({ product: productId });
    await user.save();
    return res.json(user);
  } catch (error) {
    res.status(500).send({ message: "User not found" });
  }
};

module.exports = {
  createNewUser,
  getAllUsers,
  getUserById,
  addProductToBasket,
};
