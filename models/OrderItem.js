const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;

const OrderItemSchema = new mongoose.Schema(
  {
    orderId: {
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

const orderItem = mongoose.model("OrderItem", OrderItemSchema);

module.exports = orderItem;
