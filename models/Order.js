const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: ObjectId,
      required: true,
      ref: "User",
    },
    customerId: {
      type: ObjectId,
      required: true,
      ref: "Customer",
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
    sellerName: String,
  },
  { timestamps: true }
);

OrderSchema.virtual("orderItems", {
  ref: "OrderItem",
  foreignField: "orderId",
  localField: "_id",
});

OrderSchema.set("toObject", { virtuals: true });
OrderSchema.set("toJSON", { virtuals: true });

const orderItem = mongoose.model("Order", OrderSchema);

module.exports = orderItem;
