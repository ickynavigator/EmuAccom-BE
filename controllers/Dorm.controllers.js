const asyncHandler = require("express-async-handler");
const { Dormitory } = require("../models");

/**
 * @desc   Fetch All Dorms Accomodations
 * @route  GET v1/api/dorms
 * @access Public
 */
exports.getDorms = asyncHandler(async (req, res) => {
  try {
    const pageSize = Number(req.query.pageSize) || 10;
    const page = Number(req.query.pageNumber) || 1;
    const paginate = String(req.query.paginate)?.toLowerCase() || "true";
    const param = req.query.param || "";
    const regOpt = "gim";
    let keyword = [{}];

    if (req.query.keyword) {
      keyword = [
        { name: { $regex: req.query.keyword, $options: regOpt } },
        { description: { $regex: req.query.keyword, $options: regOpt } },
        { keywords: { $regex: req.query.keyword, $options: regOpt } },
      ];

      const specificQuery = {};
      if (req.query.param) {
        specificQuery[param] = { $regex: req.query.keyword, $options: regOpt };
        keyword.push({ ...specificQuery });
      }
    }

    let result = { dorms: [] };
    if (paginate === "true") {
      const dorms = await Dormitory.find({ $or: [...keyword] })
        .limit(pageSize)
        .skip(pageSize * (page - 1));
      const count = await Dormitory.countDocuments({ $or: [...keyword] });
      result = { dorms, page, pages: Math.ceil(count / pageSize) };
    } else {
      const dorms = await Dormitory.find({ $or: [...keyword] });
      result = { dorms };
    }

    return res.status(200).json(result);
  } catch (err) {
    console.error(err);
    return res
      .status(400)
      .json({ message: "An Error has occured. Please try again." });
  }
});
