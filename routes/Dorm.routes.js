const express = require("express");
const {
  getDorms,
  getDormById,
  DeleteDormById,
  createDorm,
  updateDormById,
  getDormsByUser,
} = require("../controllers/Dorm.controllers");
const { protectManager } = require("../middleware/auth.middleware");

const router = express.Router();

router.route("/").get(getDorms).post(createDorm);
router.route("/manager/:id").get(getDormsByUser);
router
  .route("/:id")
  .get(getDormById)
  .delete(protectManager, DeleteDormById)
  .put(protectManager, updateDormById);

module.exports = router;
