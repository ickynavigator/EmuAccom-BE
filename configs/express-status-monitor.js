const auth = require("http-auth");

const config = {
  title: "EMUACCOM Status",
  path: "",
  spans: [
    { interval: 1, retention: 60 },
    { interval: 5, retention: 60 },
    { interval: 15, retention: 60 },
  ],
  chartVisibility: {
    cpu: true,
    mem: true,
    load: true,
    responseTime: true,
    rps: true,
    statusCodes: true,
  },
  healthChecks: [
    {
      protocol: "http",
      host: "localhost",
      path: "/health",
      port: process.env.PORT,
    },
  ],
};

const authBasic = auth.basic(
  { realm: "Monitor Area" },
  (user, pass, callback) => {
    const isAuthorized =
      user === process.env.STAT_USERNAME && pass === process.env.STAT_PASSWORD;

    callback(isAuthorized);
  },
);

module.exports = {
  config,
  authBasic,
};
