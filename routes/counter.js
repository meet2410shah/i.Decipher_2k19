// Configuration File
const config = require("config");
const EVENT_END_TIME = config.get("IDECIPHER.EVENT_END_TIME");
const EVENT_START_TIME = config.get("IDECIPHER.EVENT_START_TIME");

// Express Router Setup
const express = require("express");
const router = express.Router();

// Helper Functions and Modules
const calculateTime = require("../helper/calculateTime");

// Router Definition
router.get("/getEventStartTime", (req, res) => {
  res.send(calculateTime(new Date(EVENT_START_TIME)));
});

router.get("/getEventEndTime", (req, res) => {
  res.send(calculateTime(new Date(EVENT_END_TIME)));
});

router.get("/", (req, res) => {
  res.render("counter");
});

module.exports = router;
