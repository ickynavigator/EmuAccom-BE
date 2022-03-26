const mongoose = require("mongoose");
const { reviewSchema } = require("./utils.js");

const Schema = mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    address: {
      addressLine: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    bedroomCount: { type: Number, required: true },
    bedCount: { type: Number, required: true },
    bathroomCount: { type: Number, required: true },
    accomodateCount: { type: Number, required: true },
    availabilityCount: { type: Number, required: true },
    pricePerSemester: { type: Number, required: true },
    pricePerNight: { type: Number },
    pictures: [{ url: { type: String, required: true } }],
    keywords: [{ tag: { type: String, required: true } }],
    reviews: [reviewSchema],

    management: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true },
);

const Dormitory = mongoose.model("Dormitory", Schema);

module.exports = Dormitory;
