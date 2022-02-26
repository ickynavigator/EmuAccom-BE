const express = require("express");

const router = express.Router();
router.use("/dorm", require("../routes/Dorm.routes"));
router.use("/users", require("../routes/User.routes"));

module.exports = {
  routes: router,
};
