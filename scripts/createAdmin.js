const bcrypt = require("bcryptjs");
const User = require("../models/User");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

mongoose.connect(process.env.DATABASE);

async function createAdmin() {
  const existing = await User.findOne({ role: "admin" });

  if (existing) {
    console.log("Admin already exists");
    process.exit();

  }

  const password = bcrypt.hashSync("admin123", 10);
  const user = new User({
    firstName: "Jahid",
    lastName: "Hasan",
    password: "Admin123++",
    confirmPassword: "Admin123++",
    email: "admin@gmail.com",
    role: "admin",
    contactNumber: "1234567890",
    status: "active",
  });

  await user.save();
  console.log("Admin created successfully");
  process.exit();
}

createAdmin();
