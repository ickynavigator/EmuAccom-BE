const express = require("express");
const {
  registerUser,
  loginUser,
  getAllUsers,
  deleteUserById,
  getUserById,
  updateUserById,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
  verifyLogin,
} = require("../controllers/User.controllers");
const { protect, admin } = require("../middleware/auth.middleware");
const router = express.Router();

router.route("/").get(protect, admin, getAllUsers).post(registerUser);
router.route("/login").post(loginUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)
  .delete(protect, deleteUserProfile);
router.route("/auth").get(protect, verifyLogin);
router
  .route("/:id")
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUserById)
  .delete(protect, admin, deleteUserById);

module.exports = router;
