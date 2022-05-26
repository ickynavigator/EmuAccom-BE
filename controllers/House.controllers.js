const asyncHandler = require("express-async-handler");
const { House } = require("../models");

/**
 * @desc   Fetch All houses
 * @route  GET /api/house
 * @access Public
 */
exports.getHouses = asyncHandler(async (req, res) => {
  try {
    const pageSize = Number(req.query.pageSize) || 10;
    const page = Number(req.query.pageNumber) || 1;
    const noPaginate = !(Boolean(req.query.noPaginate) ?? true);
    const param = req.query.param || "";
    const regOpt = "gim";
    let keyword = [{}];

    if (req.query.keyword) {
      const kwSearch = { $regex: req.query.keyword, $options: regOpt };

      keyword = [
        { name: kwSearch },
        { description: kwSearch },
        // { "keywords.tag": kwSearch }, // TODO fix regex
        // { management: kwSearch },
      ];

      const specificQuery = {};
      if (req.query.param) {
        specificQuery[param] = kwSearch;
        keyword.push({ ...specificQuery });
      }
    }

    let result = { houses: [] };
    if (noPaginate) {
      const houses = await House.find({ $or: keyword })
        .limit(pageSize)
        .skip(pageSize * (page - 1));
      const count = await House.countDocuments({ $or: keyword });
      result = { houses, page, pages: Math.ceil(count / pageSize) };
    } else {
      const houses = await House.find({ $or: keyword });
      result = { houses };
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
 * @desc   Get house By ID
 * @route  GET /api/house/:ID
 * @access Public
 */
exports.getHouseById = asyncHandler(async (req, res) => {
  try {
    const houses = await House.findById(req.params.id);

    if (houses) {
      return res.status(200).json(houses);
    } else {
      return res.status(404).json({ message: "Dorm Not Found" });
    }
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "An Error has occured. Please try again." });
  }
});

/**
 * @desc   Delete house by ID
 * @route  DELETE /api/house/:ID
 * @access Prıvate
 */
exports.deleteHouseById = asyncHandler(async (req, res) => {
  try {
    const house = await House.findByIdAndDelete(req.params.id);

    if (house) {
      return res.status(200).end();
    } else {
      return res.status(404).json({ message: "Dorm Not Found" });
    }
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "An Error has occured. Please try again." });
  }
});
