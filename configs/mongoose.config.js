module.exports = {
  authSource: "admin",
  user: process.env.MONGOUSER,
  pass: process.env.MONGOPASSWORD,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
