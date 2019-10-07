// Express Router Setup
const express = require(`express`);
const router = express.Router();

// Router Definition
router.get(`/`, (req, res) => {
  res.redirect(`/`);
});

router.post(`/`, (req, res) => {
  res.set(`Cache-Control`, `no-cache, no-store, must-revalidate`);
  res.clearCookie(`iDecipherToken`);
  res.redirect(`/`);
});

module.exports = router;
