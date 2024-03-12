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

const createNewUser = async (req, res) => {
  await connect();
  const { userName, email, password, profileImg } = req.body;
  const user = new User({
    userName,
    email,
    password,
    profileImg,
  });
  await user.save();
  return res.json(user);
};

module.exports = { createNewUser };
