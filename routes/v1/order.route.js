const express = require("express");
const router = express.Router();
const verifyToken = require("../../middleware/verifyToken");
const authorization = require("../../middleware/authorization");

const {
  createOrder,
  getOrders,
  updateOrderById,
  getOrderById,
  orderDeleteById,
} = require("../../controllers/order.controller");

// create and get
router
  .route("/")
  .get(verifyToken, authorization("admin", "staff", "user"), getOrders)
  .post(verifyToken, authorization("user"), createOrder);

//update and delete
router
  .route("/:id")
  .get(getOrderById)
  .put(verifyToken, authorization("admin", "staff"), updateOrderById)
  .delete(verifyToken, authorization("admin", "staff"), orderDeleteById);

module.exports = router;
