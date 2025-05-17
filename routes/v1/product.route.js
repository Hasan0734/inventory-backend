const express = require("express");
const router = express.Router();
const verifyToken = require("../../middleware/verifyToken");
const authorization = require("../../middleware/authorization");

const {
  createProduct,
  getProducts,
  updateProductById,
  getProductById,
  productDeleteById,
} = require("../../controllers/product.controller");

// create and get
router
  .route("/")
  .get(getProducts)
  .post(verifyToken, authorization("admin", "staff"), createProduct);

//update and delete
router
  .route("/:id")
  .get(getProductById)
  .put(verifyToken, authorization("admin", "staff"), updateProductById)
  .delete(verifyToken, authorization("admin", "staff"), productDeleteById);

module.exports = router;
