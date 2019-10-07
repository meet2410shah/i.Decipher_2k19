// Configuration File
const config = require(`config`);
const EVENT_START_DATE = config.get(`IDECIPHER.EVENT_START_TIME`);

// Express Router Setup
const express = require(`express`);
const router = express.Router();

// Middleware Functions
const { redirectDashboard } = require(`../middleware/welcome/main`);

// Helper Functions and Modules
const calculateTime = require(`../helper/calculateTime`);

// Router Definition
router.get(`/`, redirectDashboard, (req, res) => {
  res.set(`Cache-Control`, `no-cache, no-store, must-revalidate`);
  res.status(200).render(`welcome`, {
    time: calculateTime(new Date(EVENT_START_DATE))
  });
});

module.exports = router;
