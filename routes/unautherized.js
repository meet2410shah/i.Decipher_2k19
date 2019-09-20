const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.clearCookie(`iDecipherToken`);
    return res.render('unautherized');
});

module.exports = router;