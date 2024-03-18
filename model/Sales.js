const mongoose = require("mongoose");
const { Schema } = mongoose;

const SalesSchema = new Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// model the collection
const Sales = mongoose.models.Sales || mongoose.model("Sales", SalesSchema);

module.exports = Sales;
