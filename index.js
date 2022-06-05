require("colors");
require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const OpenApiValidator = require("express-openapi-validator");
const helmet = require("helmet");
const YAML = require("yamljs");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = YAML.load("./postman/schemas/schema.yaml");

const openApiConfig = require("./configs/open-api-validator.config");
const { errorHandler, notFound } = require("./middleware");

const PORT = process.env.PORT || 5000;
const VERSION_NUMBER = process.env.VERSION_NUMBER;
const NODE_ENV = process.env.NODE_ENV;

require("./DB").connectMONGO();

const app = express();

if (NODE_ENV === "development") app.use(morgan("dev"));
const swaggerOptions = {
  swaggerOptions: {
    url: "/schema",
  },
};

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: false }));
app.use(
  "/schema/yaml",
  express.static(path.join(__dirname, "postman", "schemas", "schema.yaml")),
);
app.get("/schema", (req, res) => res.json(swaggerDocument));
app.use(
  "/",
  swaggerUi.serveFiles(null, swaggerOptions),
  swaggerUi.setup(null, swaggerOptions),
);
app.use(OpenApiValidator.middleware(openApiConfig));
app.use(`/${VERSION_NUMBER}/api`, require("./routes").routes);
app.use("/", require("./routes").monitoringRoutes);

app.get("/", (req, res) => {
  res.send("API is running....");
});

app.listen(
  PORT,
  console.log("ENVIRONMENT:".blue.bold, `${NODE_ENV}`.yellow),
  console.log("VERSION:".blue.bold, `${VERSION_NUMBER}`.yellow),
  console.log("PORT:".blue.bold, `${PORT}`.yellow),
  console.log("BASE URI:".blue.bold, `/${VERSION_NUMBER}/api`.yellow),
);

app.use(errorHandler);
app.use(notFound);
