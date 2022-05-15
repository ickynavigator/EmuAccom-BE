const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Schema = mongoose.Schema(
  {
    businessName: { type: String, required: true },
    managerFirstName: { type: String, required: true },
    managerLastName: { type: String, required: true },
    managerEmail: { type: String, required: true },
    managerDescription: { type: String, required: true },
    type: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true },
);

Schema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
Schema.methods.generateToken = async function () {
  return jwt.sign({ id: this._id.toString() }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

Schema.pre("save", async function (next) {
  if (!this.isModified("password")) next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const Manager = mongoose.model("Manager", Schema);

module.exports = Manager;
