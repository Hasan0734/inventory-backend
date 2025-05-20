const express = require("express");
const router = express.Router();
const verifyToken = require("../../middleware/verifyToken");

const {
  createOrder,
  getOrders,
  updateOrderById,
  getOrderById,
  deleteOrderById,
} = require("../../controllers/order.controller");

// create and get
router.route("/").get(verifyToken, getOrders).post(verifyToken, createOrder);

//update and delete
router
  .route("/:id")
  .get(verifyToken, getOrderById)
  .put(verifyToken, updateOrderById)
  .delete(verifyToken, deleteOrderById);

module.exports = router;
