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
    const { username, email, password, profileImg } = req.body;
    const user = new User({
      username,
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
    let user = await User.find({}).populate("cartItem.product");
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
    const user = await User.findById({ _id: userId }).populate(
      "cartItem.product"
    );
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
  // const { cartItem } = req.body;
  const cartItem = await User.findById({ _id: userId }).populate("cartItem");

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(404).send({ message: "User not found." }).end();
  }
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(404).send({ message: "Product not found." }).end();
  }
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.json({ message: "User not found." });
    }
    // Get the product from the database using the productId
    const product = await Product.findById(productId);

    if (!product) {
      return res.json({ message: "Product not found." });
    }
    // check if the product is available in the stock
    // if (product.availableInStock < 1) {
    //   return res
    //     .status(400)
    //     .send({ message: "Product is not available in the stock." });
    // }

    // Add the product to the cart
    user.cartItem.push({
      product: productId,
    });
    await user.save();
    return res.json({
      numOfProducts: cartItem.length,
      cartItems: cartItem,
    });
  } catch (error) {
    res.status(500).send({ message: "Error occurred." });
  }
};

// Remove product from cart

const removeProductFromBasket = async (req, res) => {
  const { userId, productId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.json({ message: "User not found." });
    }

    const indexToRemove = user.cartItem.findIndex(
      (item) => item.product.toString() === productId
    );
    if (indexToRemove === -1) {
      return res.json({ message: "Product not found in the cart." });
    }

    user.cartItem.splice(indexToRemove, 1); // Remove 1 item at indexToRemove
    await user.save();

    const updatedUser = await User.findById(userId).populate("cartItem");

    return res.json({
      numOfProducts: updatedUser.cartItem.length,
      cartItems: updatedUser.cartItem,
    });
  } catch (error) {
    res.status(500).send({ message: "Error occurred." });
  }
};
module.exports = {
  createNewUser,
  getAllUsers,
  getUserById,
  addProductToBasket,
  removeProductFromBasket,
};
