require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 3000;
const {
  createNewUser,
  getAllUsers,
  getUserById,
  addProductToBasket,
  removeProductFromBasket,
} = require("./controllers/userController");
const {
  createNewProduct,
  getAllProducts,
  deleteProduct,
  getProductById,
  welcomeScreen,
  getProductByName,
} = require("./controllers/productController");

const { createNewSale, getAllSales } = require("./controllers/salesController");

// Welcome screen
app.get("/", welcomeScreen);

// Create new Product
app.post("/products/product", createNewProduct);

// Delete a Product
app.delete("/products/product/:productId", deleteProduct);

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

// Add product to basket
app.post("/users/:userId/product/:productId", addProductToBasket);

// Remove product from basket
app.delete("/user/:userId/product/:productId", removeProductFromBasket);

// Create new sale
app.post("/sales/sale", createNewSale);

// Get all sales
app.get("/sales", getAllSales);

const server = app.listen(PORT, () =>
  console.log(`Express app listening on port ${PORT}!`)
);

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;
