const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const SellItemSchema = new mongoose.Schema(
  {
    sellId: {
      type: ObjectId,
      required: true,
      ref: "Order",
    },
    productId: {
      type: ObjectId,
      required: true,
      ref: "Product",
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, "Quantity must be at least 1"],
    },
    price: {
      type: Number,
      required: true,
      min: [0, "Price can't be negative"],
    },
  },
  { timestamps: true }
);

const SellItem = mongoose.model("SellItem", SellItemSchema);

module.exports = SellItem;
