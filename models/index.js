// Prices Stored in TRY
module.exports = {
  Dormitory: require("./Dormitory.model"),
  House: require("./House.model"),
  Booking: require("./Booking.model"),
  User: require("./User.model"),

  //   Utils
  reviewSchema: require("./utils.js").reviewSchema,
};
