const express = require("express");
const {
  getDorms,
  getDormById,
  DeleteDormById,
} = require("../controllers/Dorm.controllers");

const router = express.Router();

router.route("/").get(getDorms);
router.route("/:id").get(getDormById).delete(DeleteDormById);

module.exports = router;
