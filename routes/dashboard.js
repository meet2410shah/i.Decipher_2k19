const express = require("express");
const router = express.Router();

const checkTime = require('../middleware/checkTime');
const isVerified = require('../middleware/isVerified');

router.get('/', checkTime, isVerified, (req, res) => {
    res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.render('dashboard', {

    });
})

module.exports = router;