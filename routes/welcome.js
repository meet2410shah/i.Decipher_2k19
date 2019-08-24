const express = require("express");
const router = express.Router();

const checkTime = require('../middleware/checkTime');

router.get('/', checkTime, (req, res) => {
    res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.render("welcome");
})

module.exports = router;