const {
  getCustomers,
  createCustomer,
  updateCustomerById,
  deleteCustomerById
} = require("../../controllers/customer.controller");
const verifyToken = require("../../middleware/verifyToken");

const express = require("express");
const router = express.Router();

router
  .route("/")
  .get(verifyToken, getCustomers)
  .post(verifyToken, createCustomer);

router.route("/:id").put(verifyToken, updateCustomerById).delete(verifyToken ,deleteCustomerById);

module.exports = router;
