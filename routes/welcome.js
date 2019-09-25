// Configuration File
const config = require(`config`);
const EVENT_START_DATE = config.get(`IDECIPHER.EVENT_START_TIME`);

// Express Router Setup
const express = require(`express`);
const router = express.Router();

// Middleware Functions
const checkEventEndTime = require(`../middleware/checkEventEndTime`);

// Helper Functions and Modules
const calculateTime = require(`../helper/calculateTime`);

const redirectDashboard = (req, res, next) => {
    const { iDecipherToken } = req.cookies;
    if(iDecipherToken) {
        return res.redirect(`/dashboard`);
    }
    next();
}

// Router Definition
router.get(`/`, checkEventEndTime, redirectDashboard, (req, res) => {
    res.set(`Cache-Control`, `no-cache, no-store, must-revalidate`);
    res.status(200).render(`welcome`, {
        time: calculateTime(new Date(EVENT_START_DATE))
    });
})

module.exports = router;