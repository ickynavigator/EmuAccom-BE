const express = require("express");
const {
  getDorms,
  getDormById,
  DeleteDormById,
  createDorm,
  updateDormById,
  getDormsByUser,
} = require("../controllers/Dorm.controllers");

const router = express.Router();

router.route("/").get(getDorms).post(createDorm);
router.route("/manager/:id").get(getDormsByUser);
router
  .route("/:id")
  .get(getDormById)
  .delete(DeleteDormById)
  .put(updateDormById);

module.exports = router;
