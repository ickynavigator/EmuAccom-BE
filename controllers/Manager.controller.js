const asyncHandler = require("express-async-handler");
const { Manager } = require("../models");

/**
 * @desc   Verify the login of a manager
 * @route  GET /api/manager/auth
 * @access Private
 */
exports.verifyManagerLogin = asyncHandler(async (req, res) => {
  try {
    return res.status(200).json({ message: "You are logged in", valid: true });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "An Error has occured. Please try again." });
  }
});

/**
 * TODO
 * @desc   Get all managers
 * @route  GET /api/manager
 * @access Admin - Private
 */
exports.getAllManagers = asyncHandler(async (req, res) => {});

/**
 * @desc   Add a manager
 * @route  POST /api/manager
 * @access Private
 */
exports.registerManager = asyncHandler(async (req, res) => {
  try {
    const {
      businessName,
      managerFirstName,
      managerLastName,
      managerEmail,
      managerDescription,
      type,
    } = req.body;

    if (await Manager.findOne({ managerEmail }))
      return res.status(400).json({ message: "Manager Already Exists" });

    const user = await Manager.create({
      businessName,
      managerFirstName,
      managerLastName,
      managerEmail,
      managerDescription,
      type: type.toUpperCase() || "MANAGER",
    });

    if (user) {
      const token = await user.generateToken();
      const userData = {
        _id: user._id,
        businessName: user.businessName,
        managerFirstName: user.managerFirstName,
        managerLastName: user.managerLastName,
        managerEmail: user.managerEmail,
        managerDescription: user.managerDescription,
        type: user.type,
        token,
      };

      return res.status(201).json(userData);
    } else {
      return res.status(400).json({ message: "Invalid manager data" });
    }
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "An Error has occured. Please try again." });
  }
});

/**
 * @desc   Add a manager
 * @route  POST /api/manager/manager
 * @access Private
 */
exports.loginManager = asyncHandler(async (req, res) => {
  try {
    const { email: managerEmail, password } = req.body;
    const user = await Manager.findOne({ managerEmail });
    if (user && (await Manager.matchPassword(password))) {
      const token = await user.generateToken();
      const userInfo = {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        isAdmin: user.isAdmin,
        type: user.type,
        token,
      };

      return res.status(200).json(userInfo);
    } else {
      return res.status(400).json({ message: "Invalid Email or Password" });
    }
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "An Error has occured. Please try again." });
  }
});
