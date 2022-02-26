const asyncHandler = require("express-async-handler");
const { User } = require("../models");

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
      .status(400)
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
      result = { users, page, pages: Math.ceil(count / pageSize) };
    } else {
      const users = await User.find({ $or: [...keyword] }).select("-password");
      result = { users };
    }

    return res.status(200).json(result);
  } catch (err) {
    console.error(err);
    return res
      .status(400)
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
      .status(400)
      .json({ message: "An Error has occured. Please try again." });
  }
});
