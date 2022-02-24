const express = require("express");
const dormRoutes = require("../routes/Dorm.routes");

const router = express.Router();
router.use("/dorm", dormRoutes);

module.exports = {
  routes: router,
};
