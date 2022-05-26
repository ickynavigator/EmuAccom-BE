const mongoose = require("mongoose");
const mongooseConfig = require("../configs/mongoose.config");
exports.connectMONGO = async () => {
  const mongoURL = process.env.MONGO_URL;
  const ENVIRONMENT = process.env.NODE_ENV;
  const URI = `${mongoURL}/${ENVIRONMENT}?retryWrites=true&w=majority`;

  try {
    const conn = await mongoose.connect(URI, mongooseConfig);
    console.log(`\nMongoDB Connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.error(`\nError: ${error.message}`.red.underline.bold);
    process.exit(1);
  }
};
