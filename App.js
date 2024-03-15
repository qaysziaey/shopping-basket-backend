require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connect = require("./lib/connectDB");
const Product = require("./model/Products");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 3000;
const {
  createNewUser,
  getAllUsers,
  getUserById,
} = require("./controllers/userController");
const {
  createNewProduct,
  getAllProducts,
  getProductById,
  welcomeScreen,
  getProductByName,
} = require("./controllers/productController");

// Welcome screen
app.get("/", welcomeScreen);

// Create new Product
app.post("/products/product", createNewProduct);

// Get all products
app.get("/products", getAllProducts);

// Get a single Product by id
app.get("/products/:productId", getProductById);

// Get a single Product by name
app.get("/products/:productName", getProductByName);

// Create new user
app.post("/users/user", createNewUser);

// Get all user
app.get("/users", getAllUsers);

// Get user By id
app.get("/users/:userId", getUserById);

const server = app.listen(PORT, () =>
  console.log(`Express app listening on port ${PORT}!`)
);

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;
