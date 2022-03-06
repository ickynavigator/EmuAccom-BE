const { ObjectID } = require("bson");
const OpenApiValidator = require("express-openapi-validator");

module.exports = {
  apiSpec: "./postman/schemas/schema.yaml",
  validateResponses: true,
  validateRequests: true,
  serDes: [
    OpenApiValidator.serdes.dateTime,
    OpenApiValidator.serdes.date,
    {
      format: "mongo-objectid",
      deserialize: s => new ObjectID(s),
      serialize: o => o.toString(),
    },
    {
      format: "currency",
      deserialize: s => {
        const [, value] = s.split(" ");
        return parseFloat(value);
      },
      serialize: o => o.toString(),
    },
  ],
};
