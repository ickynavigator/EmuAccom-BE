const express = require("express");
const {
  getHouses,
  getHouseById,
  deleteHouseById,
} = require("../controllers/House.controllers");

const router = express.Router();

router.route("/").get(getHouses);
router.route("/:id").get(getHouseById).delete(deleteHouseById);

module.exports = router;
