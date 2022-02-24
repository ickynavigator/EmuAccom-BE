const express = require("express");
const { getDorms } = require("../controllers/Dorm.controllers");

const router = express.Router();

router.route("/").get(getDorms);

module.exports = router;
