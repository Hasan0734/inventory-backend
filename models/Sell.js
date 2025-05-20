const mongoose = require("mongoose");

const sellSchema = new mongoose.Schema(
  {
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
    shippingAddress: String,
  },
  { timestamps: true }
);

OrderSchema.virtual("sellItems", {
  ref: "SellItem",
  foreignField: "sellId",
  localField: "_id",
});

OrderSchema.set("toObject", { virtuals: true });
OrderSchema.set("toJSON", { virtuals: true });

const Sell = mongoose.model("Sell", sellSchema);

module.exports = Sell;
