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
      type: Number,
      required: true,
    },
    availableInStock: {
      type: Number,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    size: [
      {
        type: String,
        required: true,
      },
    ],
    color: [
      {
        type: String,
        required: true,
      },
    ],
    delivery: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
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
