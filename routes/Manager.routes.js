const express = require("express");
const {
  verifyManagerLogin,
  getAllManagers,
  registerManager,
  loginManager,
  getManagerProfile,
  updateManagerProfile,
  deleteManagerProfile,
} = require("../controllers/Manager.controllers");
const {
  protect,
  admin,
  protectManager,
} = require("../middleware/auth.middleware");
const router = express.Router();

router
  .route("/")
  .get(protect || protectManager, admin, getAllManagers)
  .post(registerManager);
router.route("/login").post(loginManager);
router
  .route("/profile")
  .get(protect, getManagerProfile)
  .put(protect, updateManagerProfile)
  .delete(protect, deleteManagerProfile);
router.route("/auth").get(protectManager, verifyManagerLogin);

module.exports = router;
