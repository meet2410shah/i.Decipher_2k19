const config = require("config");
const calculateTime = require("../routes/counter/calculateTime");

const EVENT_END_TIME = config.get("IDECIPHER.EVENT_END_TIME");
const checkTime = (req, res, next) => {
  const EVENT_END = new Date(EVENT_END_TIME);
  const time = calculateTime(EVENT_END);
  if (time.err) {
    console.log("Event is ended");
    return res.redirect("/thankyou");
  }
  next();
};

module.exports = checkTime;
