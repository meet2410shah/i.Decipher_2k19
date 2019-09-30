// Express Router Setup
const express = require(`express`);
const router = express.Router();

// Router Definition
router.get(`/`, (req, res) => {
    res.set(`Cache-Control`, `no-cache, no-store, must-revalidate`);
    res.clearCookie(`iDecipherToken`);
    return res.redirect(`/login`);
});

module.exports = router;