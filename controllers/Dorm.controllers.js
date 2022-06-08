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

    let result = { dorms: [] };
    if (noPaginate) {
      const dorms = await Dormitory.find({ $or: keyword })
        .limit(pageSize)
        .skip(pageSize * (page - 1));
      const count = await Dormitory.countDocuments({ $or: keyword });
      result = { dorms, page, pages: Math.ceil(count / pageSize) };
    } else {
      const dorms = await Dormitory.find({ $or: keyword });
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

/**
 * @desc   Get dorm By Id
 * @route  GET /api/dorms/:id
 * @access Public
 */
exports.getDormById = asyncHandler(async (req, res) => {
  try {
    const dorm = await Dormitory.findById(req.params.id);

    if (dorm) {
      return res.status(200).json(dorm);
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
 * @desc   Delete user By Id
 * @route  DELETE /api/dorms/:id
 * @access Prıvate
 */
exports.DeleteDormById = asyncHandler(async (req, res) => {
  try {
    const dorm = await Dormitory.findByIdAndDelete(req.params.id);

    if (dorm) {
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

/**
 * @desc   Create Dorm
 * @route  POST /api/dorms
 * @access Private, Manager
 */
exports.createDorm = asyncHandler(async (req, res) => {
  try {
    const dorm = await Dormitory.create(req.body);

    return res.status(201).json(dorm);
  } catch (err) {
    console.error(err);
    return res
      .status(400)
      .json({ message: "An Error has occured. Please try again." });
  }
});

/**
 * @desc   Update Dorm
 * @route  PUT /api/dorms/:id
 * @access Private, Manager
 */
exports.updateDormById = asyncHandler(async (req, res) => {
  try {
    const dorm = await Dormitory.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (dorm) {
      return res.status(200).json(dorm);
    } else {
      return res.status(404).json({ message: "Dorm Not Found" });
    }
  } catch (err) {
    console.error(err);
    return res
      .status(400)
      .json({ message: "An Error has occured. Please try again." });
  }
});

/**
 * @desc   Get Dorms By User
 * @route  GET /api/dorms/user/:id
 * @access Private, Manager
 */
exports.getDormsByUser = asyncHandler(async (req, res) => {
  try {
    const dorms = await Dormitory.find({ management: req.params.id });

    if (dorms) {
      return res.status(200).json(dorms);
    } else {
      return res.status(404).json({ message: "Dorms Not Found" });
    }
  } catch (err) {
    console.error(err);
    return res
      .status(400)
      .json({ message: "An Error has occured. Please try again." });
  }
});
