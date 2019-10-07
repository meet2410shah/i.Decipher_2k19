// Express Router Setup
const express = require(`express`);
const router = express.Router();

// Middleware Functions
const {
  isVerified,
  redirectQuestions
} = require(`../middleware/dashboard/main`);

// Configuration File
const config = require(`config`);
const EVENT_START_TIME = config.get(`IDECIPHER.EVENT_START_TIME`);

// Helper Functions and Modules
const calculateTime = require(`../helper/calculateTime`);

// Router Definition
router.get(`/`, isVerified, redirectQuestions, (req, res) => {
  res.set(`Cache-Control`, `no-cache, no-store, must-revalidate`);
  res.render(`dashboard`, {
    time: calculateTime(new Date(EVENT_START_TIME))
  });
});

module.exports = router;
