const express = require("express");
const router = express.Router();
const verifyToken = require("../../middleware/verifyToken");
const authorization = require("../../middleware/authorization");

const {
  createStock,
  getStocks,
  updateStockById,
  getStockById,
  stockDeleteById,
  getStockByProductId,
} = require("../../controllers/stock.controller");

// create and get
router
  .route("/")
  .get(verifyToken, authorization("admin", "staff"), getStocks)
  .post(verifyToken, authorization("admin", "staff"), createStock);

router.get("/product/:id", getStockByProductId);
//update and delete

router
  .route("/:id")
  .get(getStockById)
  .put(verifyToken, authorization("admin", "staff"), updateStockById)
  .delete(verifyToken, authorization("admin", "staff"), stockDeleteById);

module.exports = router;
