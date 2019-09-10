const config = require("config");
const express = require("express");
const router = express.Router();
const calculateTime = require("./calculateTime");

const EVENT_END_TIME = config.get("IDECIPHER.EVENT_END_TIME");
const EVENT_START_TIME = config.get("IDECIPHER.EVENT_START_TIME");

const EVENT_START = new Date(EVENT_START_TIME);
const EVENT_END = new Date(EVENT_END_TIME);

router.get("/getEventStartTime", (req, res) => {
  res.send(calculateTime(EVENT_START));
});

router.get("/getEventEndTime", (req, res) => {
  res.send(calculateTime(EVENT_END));
});

router.get("/", (req, res) => {
  res.render("counter");
});
module.exports = router;
