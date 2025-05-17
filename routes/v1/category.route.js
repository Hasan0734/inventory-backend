const express = require("express");
const router = express.Router();
const verifyToken = require("../../middleware/verifyToken");
const authorization = require("../../middleware/authorization");

const {
  createCategory,
  getCategories,
  updateCategoryById,
  getCategoryById,
  categoryDeleteById,
} = require("../../controllers/category.controller");

// create and get
router
  .route("/")
  .get(getCategories)
  .post(verifyToken, authorization("admin", "staff"), createCategory);

//update and delete
router
  .route("/:id")
  .get(getCategoryById)
  .put(verifyToken, authorization("admin", "staff"), updateCategoryById)
  .delete(verifyToken, authorization("admin", "staff"), categoryDeleteById);

module.exports = router;
