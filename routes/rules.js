// Configuration File
const config = require('config');
const EVENT_END_TIME = config.get("IDECIPHER.EVENT_END_TIME");

// Express Router Setup
const express = require('express');
const router = express.Router();

// Middleware Functions
const checkEventEndTime = require('../middleware/checkEventEndTime');

// Helper Functions and Modules
const calculateTime = require('../helper/calculateTime');

// Router Definition
router.get("/", checkEventEndTime, (req, res) => {
    res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.render("rules", {
        time: calculateTime(new Date(EVENT_END_TIME))
    });
});

module.exports = router;