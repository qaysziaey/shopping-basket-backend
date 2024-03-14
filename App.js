require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connect = require("./lib/connectDB");
const User = require("./model/Users");
const Product = require("./model/Products");

const { createNewUser } = require("./controllers/userController");
const {
  createNewProduct,
  getAllProducts,
  getProductById,
} = require("./controllers/productController");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 3000;

// Welcome screen
app.get("/", (req, res) => {
  res.send({
    message: "Welcome to our API",
    api: "http://localhost:3000/products",
  });
});

// Create new Product
app.post("/products/product", createNewProduct);

// Get all products
app.get("/products", getAllProducts);

// Get a single Product by id
app.get("/products/:productId", getProductById);

// Create new user
app.post("/users/user", async (req, res) => {
  await connect();
  const { username, email, password, profileImg } = req.body;
  const user = new User({
    username,
    email,
    password,
    profileImg,
  });
  await user.save();
  return res.json(user);
});

// Get all user
app.get("/users", async (req, res) => {
  await connect();
  const user = await User.find({});
  return res.json(user);
});

const server = app.listen(PORT, () =>
  console.log(`Express app listening on port ${PORT}!`)
);

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;
