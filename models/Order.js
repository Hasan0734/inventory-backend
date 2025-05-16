const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;

const OrderItemSchema = new mongoose.Schema(
  {
    userId: {
      type: ObjectId,
      required: true,
      ref: "User",
    },
    status: {
      type: String,
      required: true,
      default: "pending",
      enum: {
        values: ["pending", "processing", "shipped", "delivered", "cancelled"],
        message: "Status value can't be {VALUE}",
      },
    },
    totalAmount: {
      type: Number,
      required: true,
      min: [0, "Total amount can't be negative"],
    },
    shippingAddress: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const orderItem = mongoose.model("OrderItem", OrderItemSchema);

module.exports = orderItem;
