const {
  signup,
  signin,
  getMe,
  addUser,
} = require("../../controllers/user.controller");
const authorization = require("../../middleware/authorization");
const verifyToken = require("../../middleware/verifyToken");

const express = require("express");
const router = express.Router();

router.post("/signup", signup);
router.post("/add-user", verifyToken, authorization("admin"), addUser);
router.post("/signin", signin);
router.get("/me", verifyToken, getMe);

module.exports = router;
