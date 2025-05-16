const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const stockSchema = new mongoose.Schema(
  {
    productId: {
      type: ObjectId,
      ref: "Product",
      required: [true, "Product id is required"],
      unique: [true, "Product id is unique."],
    },
    supplierId: {
      type: ObjectId,
      ref: "Supplier",
      required: [true, "Supplier id is required"],
      unique: [true, "Supplier id is unique."],
    },
    quantity: {
      type: Number,
      required: true,
      minLength: [0, "Product quantity can't be negative"],
    },
    unit: {
      type: String,
      required: true,
      enum: {
        values: ["kg", "litre", "pcs", "bag"],
        message: "Unit value can't be {VALUE}, must be kg/litre/pcs/bag",
      },
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["in-stock", "out-of-stock", "discontinued"],
        message: "Status can't be {VALUE}",
      },
    },

    description: String,
    sellCount: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { timestamps: true }
);

stockSchema.pre("save", function (next) {
  this.sellCount = 0;
  next();
});

const stock = mongoose.model("Stock", stockSchema);

module.exports = stock;
