const mongoose = require("mongoose");

// Prices stored in TRY
const Schema = mongoose.Schema(
  {
    checkInDate: { type: Date, required: true },
    checkOutDate: { type: Date, required: true },
    prices: {
      pricePaid: { type: Number, required: true },
      taxPaid: { type: Number, required: true },
      totalPaid: { type: Number, required: true },
    },
    house: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "House",
    },
  },
  { timestamps: true },
);

const RegularBooking = mongoose.model("DormModel", Schema);

module.exports = RegularBooking;
