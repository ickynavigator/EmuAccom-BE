const asyncHandler = require("express-async-handler");

/**
 * @desc   Retrieve the Health of the application
 * @route  GET /health
 * @access Public
 */
exports.getHealth = asyncHandler(async (req, res) => {
  const data = {
    uptime: process.uptime(),
    message: "Ok",
    date: new Date(),
  };

  return res.status(200).json(data);
});

/**
 * @desc   Retrieve the version of the application
 * @route  GET /version
 * @access Public
 */
exports.getVersion = asyncHandler(async (req, res) => {
  const VERSION_NUMBER = process.env.VERSION_NUMBER;
  return res.status(200).json(VERSION_NUMBER);
});
