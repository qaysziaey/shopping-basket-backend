const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProductSchema = new Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    availableInStock: {
      type: Number,
      required: true,
    },
    thumbnail: {
      type: String,
      default: "default.png",
    },
    size: [
      {
        type: String,
        required: true,
      },
      {
        type: Number,
        required: true,
      },
    ],
    color: [
      {
        type: String,
        required: true,
      },
      {
        type: Number,
        required: true,
      },
    ],
    deliver: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    vatText: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// model the collection

const Product =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);

module.exports = Product;
