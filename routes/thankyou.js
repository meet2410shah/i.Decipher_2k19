const express = require("express");
const router = express.Router();

const config = require("config");
const calculateTime = require("../routes/counter/calculateTime");

const EVENT_START_TIME = config.get("IDECIPHER.EVENT_START_TIME");
const EVENT_END_TIME = config.get("IDECIPHER.EVENT_END_TIME");

router.get("/", (req, res) => {
  res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
  const EVENT_START = new Date(EVENT_START_TIME);
  const EVENT_END = new Date(EVENT_END_TIME);
  const time1 = calculateTime(EVENT_START);
  const time2 = calculateTime(EVENT_END);
  if (!time1.err) {
    // Event is not started
    return res.redirect("/dashboard");
  } else {
    // Event is started
    if(time2.err) {
      // Event is completed
      res.send(`
        <h1>Thank You..</h1>
      `);
    } else {
      // Event is not completed
      res.redirect('/questions');
    }
  }
});

module.exports = router;
