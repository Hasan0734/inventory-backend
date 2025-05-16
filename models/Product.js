const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name for this product."],
      trim: true,
      unique: [true, "Name must be unique."],
      lowercase: true,
      minLength: [3, "Name must be at least 3 characters."],
      maxLength: [100, "Name is too large."],
    },
    description: {
      type: String,
      required: true,
    },
    imageUrls: [
      {
        required: true,
        type: String,
        validate: [validator.isURL, "Please provide a valid url."],
      },
    ],
    unit: {
      type: String,
      required: true,
      enum: {
        values: ["kg", "litre", "pcs", "bag"],
        message: "Unit value can't be {VALUE}, must be kg/litre/pcs/bag",
      },
    },
    price: {
      type: Number,
      required: [true, "Product price is requried."],
      minLength: [0, "Product price can't be negative"],
    },
    category: {
      name: {
        type: String,
        required: true,
      },
      id: {
        type: ObjectId,
        ref: "Category",
        required: true,
      },
    },
  },
  { timestamps: true }
);

productSchema.virtual("stock", {
  ref: "Stock",
  foreignField: "productId",
  localField: "_id",
  justOne: true
});

productSchema.set("toObject", { virtuals: true });
productSchema.set("toJSON", { virtuals: true });


const product = mongoose.model("Product", productSchema);

module.exports = product;
