const express = require("express");
const router = express.Router();
const verifyToken = require("../../middleware/verifyToken");
const authorization = require("../../middleware/authorization");

const {
  createStock,
  getCategories,
  updateStockById,
  getStockById,
  stockDeleteById

} = require("../../controllers/stock.controller");

// create and get
router
  .route("/")
  .get(getCategories)
  .post(verifyToken, authorization("admin", "staff"), createStock);

//update and delete
router
  .route("/:id")
  .get(getStockById)
  .put(verifyToken, authorization("admin", "staff"), updateStockById)
  .delete(verifyToken, authorization("admin", "staff"), stockDeleteById);

module.exports = router;
