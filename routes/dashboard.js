// Configuration File
const config = require(`config`);
const EVENT_START_DATE = config.get(`IDECIPHER.EVENT_START_TIME`);

// Express Router Setup
const express = require(`express`);
const router = express.Router();

// Middleware Functions
const checkEventEndTime = require(`../middleware/checkEventEndTime`);
const isVerified = require(`../middleware/isVerified`);

// Helper Functions and Modules
const calculateTime = require(`../helper/calculateTime`);

const redirectQuestions = (req, res, next) => {
    const time = calculateTime(new Date(EVENT_START_DATE));
    if(time.err) {
        return res.redirect('/questions');
    }
    return next();
}

// Router Definition
router.get(`/`, checkEventEndTime, isVerified, redirectQuestions,(req, res) => {
    res.set(`Cache-Control`, `no-cache, no-store, must-revalidate`);
    res.render(`dashboard`, {
        time: calculateTime(new Date(EVENT_START_DATE))
    });
})

module.exports = router;