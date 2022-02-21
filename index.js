require("colors");
require("dotenv").config();

const express = require("express");
const morgan = require("morgan");

const PORT = process.env.PORT || 5000;
const VERSION_NUMBER = process.env.VERSION_NUMBER || "v1";
const NODE_ENV = process.env.NODE_ENV;

require("./DB").connectMONGO();

const app = express();

if (NODE_ENV === "development") app.use(morgan("dev"));

app.use(express.json());
// app.use(`/${VERSION_NUMBER}/api`, require("./routes"))

app.get("/", (req, res) => {
  res.send("API is running....");
});

app.listen(
  PORT,
  console.log(
    `\nServer running in ${NODE_ENV} mode on port ${PORT} -> http://localhost:${PORT}/${VERSION_NUMBER}/api`
      .blue.bold,
  ),
);
