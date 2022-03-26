const mongoose = require("mongoose");
const mongooseConfig = require("../configs/mongoose.config");
exports.connectMONGO = async () => {
  const mongoURL = process.env.MONGO_URL;
  const mongoDB = process.env.NODE_ENV;
  const URI = `${mongoURL}/${mongoDB}`;

  try {
    const conn = await mongoose.connect(URI, mongooseConfig);
    console.log(`\nMongoDB Connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.error(`\nError: ${error.message}`.red.underline.bold);
    process.exit(1);
  }
};
