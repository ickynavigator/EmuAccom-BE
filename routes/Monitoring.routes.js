const express = require("express");
const authConnect = require("http-auth-connect");
const {
  getHealth,
  getVersion,
} = require("../controllers/Monitoring.controllers");
const {
  config: statConfig,
  authBasic,
} = require("../configs/express-status-monitor");

const statusMonitor = require("express-status-monitor")(statConfig);

const router = express.Router();

const basic = authBasic;

router.use(statusMonitor.middleware);

router.route("/health").get(getHealth);
router.route("/version").get(getVersion);
router.route("/status").get(authConnect(basic), statusMonitor.pageRoute);

module.exports = router;
