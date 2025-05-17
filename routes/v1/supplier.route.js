const express = require("express");
const router = express.Router();
const verifyToken = require("../../middleware/verifyToken");
const authorization = require("../../middleware/authorization");

const {
  createSupplier,
  getCategories,
  updateSupplierById,
  getSupplierById,
  supplierDeleteById,
} = require("../../controllers/supplier.controller");

// create and get
router
  .route("/")
  .get(getCategories)
  .post(verifyToken, authorization("admin", "staff"), createSupplier);

//update and delete
router
  .route("/:id")
  .get(getSupplierById)
  .put(verifyToken, authorization("admin", "staff"), updateSupplierById)
  .delete(verifyToken, authorization("admin", "staff"), supplierDeleteById);

module.exports = router;
