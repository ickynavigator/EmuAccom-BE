const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
const asyncHandler = require("express-async-handler");

exports.protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      return next();
    } catch (error) {
      console.error(error);
      return res
        .status(401)
        .json({ message: "Not Authorized, token failed!!!" });
    }
  }

  return res.status(401).json({ message: "Not Authorized, no Token" });
});

exports.admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    return next();
  } else {
    return res.status(401).json({ message: "Not authorized as an admin" });
  }
};
