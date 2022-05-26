// Prices Stored in TRY
module.exports = {
  Dormitory: require("./Dormitory.model"),
  House: require("./House.model"),
  Booking: require("./Booking.model"),
  User: require("./User.model"),
  Manager: require("./Manager.model"),

  //   Utils
  reviewSchema: require("./utils.js").reviewSchema,
};
