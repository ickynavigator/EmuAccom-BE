const asyncHandler = require("express-async-handler");
const { User, Manager } = require("../models");
const { updateIfNotEmpty } = require("../utils");
const jwt = require("jsonwebtoken");

/**
 * @desc   Register A New User
 * @route  POST /api/users
 * @access Public
 */
exports.registerUser = asyncHandler(async (req, res) => {
  try {
    const { firstName, lastName, email, password, type } = req.body;

    if (await User.findOne({ email }))
      return res.status(400).json({ message: "User Already Exists" });

    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      type,
      isAdmin: false,
    });

    if (user) {
      const token = await user.generateToken();
      const userData = {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        isAdmin: user.isAdmin,
        token,
      };

      return res.status(201).json(userData);
    } else {
      return res.status(400).json({ message: "Invalid User data" });
    }
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "An Error has occured. Please try again." });
  }
});

/**
 * @desc   Get all users
 * @route  GET /api/users
 * @access Admin - Private
 */
exports.getAllUsers = asyncHandler(async (req, res) => {
  try {
    const pageSize = Number(req.query.pageSize) || 10;
    const page = Number(req.query.pageNumber) || 1;
    const noPaginate = !(Boolean(req.query.noPaginate) ?? true);
    const param = req.query.param || "";
    const regOpt = "gim";
    let keyword = [{}];

    if (req.query.keyword) {
      keyword = [
        { firstName: { $regex: req.query.keyword, $options: regOpt } },
        { lastName: { $regex: req.query.keyword, $options: regOpt } },
        { email: { $regex: req.query.keyword, $options: regOpt } },
      ];

      const specificQuery = {};
      if (req.query.param) {
        specificQuery[param] = { $regex: req.query.keyword, $options: regOpt };
        keyword.push({ ...specificQuery });
      }
    }

    let result = { users: [] };
    if (noPaginate) {
      const users = await User.find({ $or: [...keyword] })
        .limit(pageSize)
        .skip(pageSize * (page - 1))
        .select("-password");
      const count = await User.countDocuments({ $or: [...keyword] });
      result = {
        users,
        page,
        pages: Math.ceil(count / pageSize),
        total: count,
      };
    } else {
      const users = await User.find({ $or: [...keyword] }).select("-password");
      result = { users, total: users.length };
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
 * @desc   Get user By Id
 * @route  GET /api/users/:id
 * @access Admin - Private
 */
exports.getUserById = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (user) {
      return res.status(200).json(user);
    } else {
      return res.status(404).json({ message: "User Not Found" });
    }
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "An Error has occured. Please try again." });
  }
});

/**
 * @desc   Update User Details By id
 * @route  PUT /api/users/:id
 * @access Admin - Private
 */
exports.updateUserById = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      const { firstName, lastName, email, type, isAdmin } = req.body;

      updateIfNotEmpty(user, [
        { key: "firstName", value: String(firstName).trim() },
        { key: "lastName", value: String(lastName).trim() },
        { key: "email", value: String(email).trim() },
        { key: "type", value: String(type).trim() },
        { key: "isAdmin", value: String(isAdmin).trim() },
      ]);

      const updatedUser = await user.save();
      return res.status(200).json({
        _id: updatedUser._id,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
        type: updatedUser.type,
        isAdmin: updatedUser.isAdmin,
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
 * @desc   Delete a user by Id
 * @route  DELETE /api/users/:id
 * @access Admin - Private
 */
exports.deleteUserById = asyncHandler(async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (user) {
      return res.status(204).end();
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
 * @desc   Auth User and get token
 * @route  POST v1/api/users/login
 * @access Public
 */
exports.loginUser = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
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
      return res.status(401).json({ message: "Invalid Username or Password" });
    }
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "An Error has occured. Please try again." });
  }
});

/**
 * @desc   Get the logged-in user's profile
 * @route  GET /api/users/profile
 * @access Private
 */
exports.getUserProfile = asyncHandler(async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const { id } = jwt.decode(token);

    if (id) {
      const user = await User.findById(id);
      if (user) {
        const { _id, firstName, lastName, email, type, isAdmin } = user;

        const userData = { _id, firstName, lastName, type, email, isAdmin };
        return res.status(200).json(userData);
      } else {
        return res.status(404).json({ message: "User not found" });
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
 * @route  PUT /api/users/profile
 * @access Private
 */
exports.updateUserProfile = asyncHandler(async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const { id } = jwt.decode(token);
    if (!id) {
      return res.status(401).json({ message: "Invalid Token" });
    }

    const user = await User.findById(id);

    if (user) {
      const { firstName, lastName, email } = req.body;

      updateIfNotEmpty(user, [
        { key: "firstName", value: String(firstName).trim() },
        { key: "lastName", value: String(lastName).trim() },
        { key: "email", value: String(email).trim() },
      ]);

      const updatedUser = await user.save();
      return res.status(200).json({
        _id: updatedUser._id,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
        type: updatedUser.type,
        isAdmin: updatedUser.isAdmin,
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
 * @desc   Delete the logged-in user's Profile
 * @route  DELETE /api/users/profile
 * @access Private
 */
exports.deleteUserProfile = asyncHandler(async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const { id } = jwt.decode(token);
    if (!id) {
      return res.status(401).json({ message: "Invalid Token" });
    }

    if (await User.findById(id)) {
      const user = await User.findByIdAndDelete(id);

      if (user) {
        return res.status(204).end();
      }
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
 * @desc   Verify the login
 * @route  GET /api/users/auth
 * @access Private
 */
exports.verifyLogin = asyncHandler(async (req, res) => {
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
 * @desc   Verify the login of a manager
 * @route  GET /api/users/authManager
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
 * @route  GET /api/users/manager
 * @access Admin - Private
 */
exports.getAllManagers = asyncHandler(async (req, res) => {});

/**
 * @desc   Add a manager
 * @route  POST /api/users/manager
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
