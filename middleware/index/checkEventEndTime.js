// Configuration File
const config = require(`config`);
const EVENT_END_TIME = config.get("IDECIPHER.EVENT_END_TIME");

// Special Functions and Modules
const calculateTime = require("../../helper/calculateTime");

const checkEventEndTime = (req, res, next) => {
  const { err } = calculateTime(new Date(EVENT_END_TIME));
  if (err) {
    return res.render(`thankyou`);
  }
  next();
};

module.exports = checkEventEndTime;
