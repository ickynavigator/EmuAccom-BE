const bcrypt = require("bcryptjs");

const users = [
  {
    firstName: "John",
    lastName: "Doe",
    email: "john@doe.com",
    password: bcrypt.hashSync("password", 10),
    type: "dormOwner",
    isAdmin: true,
  },
  {
    firstName: "Jane",
    lastName: "Doe",
    email: "jane@doe.com",
    password: bcrypt.hashSync("password", 10),
    type: "dormOwner",
    isAdmin: true,
  },
];

module.exports = { users };
