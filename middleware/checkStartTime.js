const config = require("config");
const calculateTime = require("../helper/calculateTime");

const EVENT_START_TIME = config.get("IDECIPHER.EVENT_START_TIME");
const checkStartTime = (req, res, next) => {
  const EVENT_START = new Date(EVENT_START_TIME);
  const time = calculateTime(EVENT_START);
  if (!time.err) {
    return res.redirect("/dashboard");
  }
  next();
};

module.exports = checkStartTime;
