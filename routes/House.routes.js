const express = require("express");
const {
  getHouses,
  getHouseById,
  deleteHouseById,
  createHouse,
  updateHouseById,
  getHousesByUser,
} = require("../controllers/House.controllers");
const { protectManager } = require("../middleware/auth.middleware");

const router = express.Router();

router.route("/").get(getHouses).post(createHouse);
router.route("/manager/:id").get(getHousesByUser);
router
  .route("/:id")
  .get(getHouseById)
  .delete(protectManager, deleteHouseById)
  .put(protectManager, updateHouseById);

module.exports = router;
