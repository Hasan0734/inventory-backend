const mongoose = require("mongoose");
const validator = require("validator");

const supplierSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [0, "Please provide a name"],
      trim: true,
      lowercase: true,
      minLength: [3, "Name must be at leas 3 characters."],
      maxLength: [100, "Name is too large."],
    },
    email: {
      type: String,
      required: [true, "Email address is required"],
      valdiate: [validator.isEmail, "Provide a valid Email"],
    },
    imageURL: {
      type: String,
      validate: [validator.isURL, "Please provide a valid url"],
    },
    contact: {
      type: String,
      required: [true, "Please provide a contact number"],
      validate: {
        validator: (value) => {
          return validator.isMobilePhone(value);
        },
        message: "Please provide a valid phone number.",
      },
    },
    address: {
      type: String,
      required: [true, "Please provide your address"],
    },
    status: {
      type: String,
      required: true,
      default: "active",
      enum: {
        values: ["active", "inactive"],
        message: "Status can't be {VALUE}",
      },
    },
  },
  { timestamps: true }
);

const supplier = mongoose.model("Suppplier", supplierSchema);

module.exports = supplier;
