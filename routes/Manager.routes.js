const express = require("express");
const {
  verifyManagerLogin,
  getAllManagers,
  registerManager,
  loginManager,
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
router.route("/auth").get(protectManager, verifyManagerLogin);
router.route("/login").post(protect, loginManager);

module.exports = router;
