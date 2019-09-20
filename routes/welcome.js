// Configuration File
const config = require('config');
const EVENT_START_DATE = config.get('IDECIPHER.EVENT_START_TIME');

// Express Router Setup
const express = require("express");
const router = express.Router();

// Middleware Functions
const checkEventEndTime = require('../middleware/checkEventEndTime');

// Helper Functions and Modules
const calculateTime = require('../helper/calculateTime');

// Router Definition
router.get('/', checkEventEndTime, (req, res) => {
    res.render("welcome", {
        time: calculateTime(new Date(EVENT_START_DATE))
    });
})

module.exports = router;