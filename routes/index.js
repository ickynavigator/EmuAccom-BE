const express = require("express");

const router = express.Router();
router.use("/dorm", require("../routes/Dorm.routes"));
router.use("/users", require("../routes/User.routes"));
router.use("/house", require("../routes/House.routes"));

module.exports = {
  routes: router,
  monitoringRoutes: require("../routes/Monitoring.routes"),
};
