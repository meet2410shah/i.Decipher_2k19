const express = require("express");
const router = express.Router();
const calculateTime = require("./calculateTime");

const TWO_HOURS = 1000 * 60 * 60 * 2;

const EVENT_START = new Date("August 22, 2019 13:00:00");
const EVENT_END = new Date(parseInt(EVENT_START.getTime() + TWO_HOURS));

router.get("/getEventStartTime", (req, res) => {
  res.send(calculateTime(EVENT_START));
});

router.get("/getEventEndTime", (req, res) => {
  res.send(calculateTime(EVENT_END));
});

module.exports = router;
