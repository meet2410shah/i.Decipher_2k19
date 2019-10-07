// Configuration File
const config = require(`config`);
const EVENT_START_TIME = config.get(`IDECIPHER.EVENT_START_TIME`);

// Helper Functions
const calculateTime = require(`../../helper/calculateTime`);

// Middleware definition
const registrationClosed = (req, res, next) => {
  const { err } = calculateTime(new Date(EVENT_START_TIME));
  if (err) {
    return res.render(`sorry`);
  } else {
    return next();
  }
};

module.exports = registrationClosed;
