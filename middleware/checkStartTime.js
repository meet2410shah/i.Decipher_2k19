const config = require("config");
const calculateTime = require("../routes/counter/calculateTime");

const EVENT_START_TIME = config.get("IDECIPHER.EVENT_START_TIME");
const checkStartTime = (req, res, next) => {
  const EVENT_START = new Date(EVENT_START_TIME);
  const time = calculateTime(EVENT_START);
  if (!time.err) {
      console.log("Event is started");
    return res.redirect("/dashboard");
  }
  next();
};

module.exports = checkStartTime;
