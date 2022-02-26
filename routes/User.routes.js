const express = require("express");
const {
  registerUser,
  loginUser,
  getAllUsers,
} = require("../controllers/User.controllers");
const { protect, admin } = require("../middleware/auth.middleware");
const router = express.Router();

router.route("/").get(protect, admin, getAllUsers).post(registerUser);
router.route("/login").post(loginUser);

module.exports = router;
