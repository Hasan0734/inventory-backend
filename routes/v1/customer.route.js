const {
  getCustomers,
  createCustomer,
} = require("../../controllers/customer.controller");
const verifyToken = require("../../middleware/verifyToken");

const express = require("express");
const router = express.Router();

router
  .route("/")
  .get(verifyToken, getCustomers)
  .post(verifyToken, createCustomer);

module.exports = router;
