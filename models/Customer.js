const mongoose = require("mongoose");
const validator = require("validator");

const customerSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      valdiate: [validator.isEmail, "Provide a valid Email"],
      trim: true,
      lowercase: true,
      // unique: true,
      // required: [true, "Email address is required"],
    },

    name: {
      type: String,
      required: [true, "Please provide a  name"],
      trim: true,
      minLength: [3, "Name must be at least 3 characters."],
      maxLength: [100, "Name is too large"],
    },

    contactNumber: {
      type: String,
      unique: true,
      required: [true, "Phone number is required."],
      validate: [
        validator.isMobilePhone,
        "Please provide a valid contact number.",
      ],
    },
    address: {
      type: String,
      required: [true, "Addres is required."],
    },
    // shippingAddress: String,
    imageURL: {
      type: String,
      validate: [validator.isURL, "Please provide a valid url."],
    },
    // status: {
    //   type: String,
    //   default: "active",
    //   enum: ["active", "inactive", "blocked"],
    // },
  },
  {
    timestamps: true,
  }
);

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
