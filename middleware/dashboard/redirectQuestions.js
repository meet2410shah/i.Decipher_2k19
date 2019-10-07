// Configuration File
const config = require(`config`);
const EVENT_START_DATE = config.get(`IDECIPHER.EVENT_START_TIME`);

// Helper Functions and Modules
const calculateTime = require(`../../helper/calculateTime`);

// Middleware Definition
const redirectQuestions = (req, res, next) => {
  const { err } = calculateTime(new Date(EVENT_START_DATE));
  if (err) {
    return res.redirect(`/questions`);
  }
  return next();
};

module.exports = redirectQuestions;
