const express = require("express");
const {
  verifyManagerLogin,
  getAllManagers,
  registerManager,
  loginManager,
  getManagerProfile,
  updateManagerProfile,
  deleteManagerProfile,
  getAllPropertiesByProfile,
  getAllPropertiesByIdAndType,
  deletePropertiesByIdAndType,
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
router.route("/auth").get(protectManager, verifyManagerLogin);
router
  .route("/profile")
  .get(protectManager, getManagerProfile)
  .put(protectManager, updateManagerProfile)
  .delete(protectManager, deleteManagerProfile);
router
  .route("/profile/property")
  .get(protectManager, getAllPropertiesByProfile);
router
  .route("/property/:type/:id")
  .get(protectManager, getAllPropertiesByIdAndType)
  .delete(protectManager, deletePropertiesByIdAndType);

module.exports = router;
