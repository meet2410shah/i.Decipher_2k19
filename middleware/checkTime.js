const config = require("config");
const calculateTime = require("../routes/counter/calculateTime");

const EVENT_START_TIME = config.get("IDECIPHER.EVENT_START_TIME");
const checkTime = (req, res, next) => {
  const EVENT_START = new Date(EVENT_START_TIME);
  const time = calculateTime(EVENT_START);
  if (time.err) {
    return res.redirect("/thankyou");
  }
  next();
};

module.exports = checkTime;
