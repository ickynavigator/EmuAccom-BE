const asyncHandler = require("express-async-handler");
const { Manager } = require("../models");
const jwt = require("jsonwebtoken");
const { updateIfNotEmpty } = require("../utils");

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
exports.getAllManagers = asyncHandler(async (req, res) => {
  try {
    const pageSize = Number(req.query.pageSize) || 10;
    const page = Number(req.query.pageNumber) || 1;
    const noPaginate = !(Boolean(req.query.noPaginate) ?? true);
    const param = req.query.param || "";
    const regOpt = "gim";
    let keyword = [{}];

    if (req.query.keyword) {
      keyword = [
        { businessName: { $regex: req.query.keyword, $options: regOpt } },
        { managerFirstName: { $regex: req.query.keyword, $options: regOpt } },
        { managerLastName: { $regex: req.query.keyword, $options: regOpt } },
        { managerEmail: { $regex: req.query.keyword, $options: regOpt } },
      ];

      const specificQuery = {};
      if (req.query.param) {
        specificQuery[param] = { $regex: req.query.keyword, $options: regOpt };
        keyword.push({ ...specificQuery });
      }
    }

    let result = { users: [] };
    if (noPaginate) {
      const managers = await Manager.find({ $or: [...keyword] })
        .limit(pageSize)
        .skip(pageSize * (page - 1))
        .select("-password");
      const count = await Manager.countDocuments({ $or: [...keyword] });
      result = {
        managers,
        page,
        pages: Math.ceil(count / pageSize),
        total: count,
      };
    } else {
      const managers = await Manager.find({ $or: [...keyword] }).select(
        "-password",
      );
      result = { managers, total: managers.length };
    }

    return res.status(200).json(result);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "An Error has occured. Please try again." });
  }
});

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
      password,
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
      password,
      type,
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
 * @route  POST /api/manager/login
 * @access Public
 */
exports.loginManager = asyncHandler(async (req, res) => {
  try {
    const { managerEmail, password } = req.body;
    const user = await Manager.findOne({ managerEmail });
    if (user && (await user.matchPassword(password))) {
      const token = await user.generateToken();
      const userInfo = {
        _id: user._id,
        businessName: user.businessName,
        managerFirstName: user.managerFirstName,
        managerLastName: user.managerLastName,
        managerEmail: user.managerEmail,
        managerDescription: user.managerDescription,
        type: user.type,
        token,
      };

      return res.status(200).json(userInfo);
    } else {
      return res.status(401).json({ message: "Invalid Email or Password" });
    }
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "An Error has occured. Please try again." });
  }
});

/**
 * @desc   Get the logged-in manager's profile
 * @route  GET /api/manager/profile
 * @access Private
 */
exports.getManagerProfile = asyncHandler(async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const { id } = jwt.decode(token);

    if (id) {
      const manager = await Manager.findById(id);
      if (manager) {
        const {
          businessName,
          managerFirstName,
          managerLastName,
          managerEmail,
          managerDescription,
          type,
        } = manager;

        const managerData = {
          businessName,
          managerFirstName,
          managerLastName,
          managerEmail,
          managerDescription,
          type,
        };
        return res.status(200).json(managerData);
      } else {
        return res.status(404).json({ message: "Manager not found" });
      }
    }

    return res.status(401).json({ message: "Invalid Token" });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "An Error has occured. Please try again." });
  }
});

/**
 * @desc   Update the logged-in user's Profile
 * @route  PUT /api/manager/profile
 * @access Private
 */
exports.updateManagerProfile = asyncHandler(async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const { id } = jwt.decode(token);
    if (!id) {
      return res.status(401).json({ message: "Invalid Token" });
    }

    const manager = await Manager.findById(id);

    if (manager) {
      const {
        businessName,
        managerFirstName,
        managerLastName,
        managerEmail,
        managerDescription,
        password,
      } = req.body;

      updateIfNotEmpty(manager, [
        { key: "businessName", value: String(businessName).trim() },
        { key: "managerFirstName", value: String(managerFirstName).trim() },
        { key: "managerLastName", value: String(managerLastName).trim() },
        { key: "managerEmail", value: String(managerEmail).trim() },
        { key: "managerDescription", value: String(managerDescription).trim() },
        { key: "password", value: String(password).trim() },
      ]);

      const updatedManager = await manager.save();
      return res.status(200).json({
        _id: updatedManager._id,
        businessName: updatedManager.businessName,
        managerFirstName: updatedManager.managerFirstName,
        managerLastName: updatedManager.managerLastName,
        managerEmail: updatedManager.managerEmail,
        managerDescription: updatedManager.managerDescription,
        type: updatedManager.type,
        token,
      });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "An Error has occured. Please try again." });
  }
});

/**
 * @desc   Delete the logged-in manager's Profile
 * @route  DELETE /api/manager/profile
 * @access Private
 */
exports.deleteManagerProfile = asyncHandler(async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const { id } = jwt.decode(token);
    if (!id) {
      return res.status(401).json({ message: "Invalid Token" });
    }

    if (await Manager.findById(id)) {
      const manager = await Manager.findByIdAndDelete(id);

      if (manager) {
        return res.status(204).end();
      }
    } else {
      return res.status(404).json({ message: "Manager not found" });
    }
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "An Error has occured. Please try again." });
  }
});
