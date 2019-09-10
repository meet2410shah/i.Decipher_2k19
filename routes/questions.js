const checkLoggedIn = require('../middleware/checkLoggedIn');
const redirectQuestion = require('../middleware/redirectQuestion');
const checkTime = require("../middleware/checkTime");
const isVerified = require('../middleware/isVerified');
const Teams = require('../database/models/teams');
const checkStartTime = require("../middleware/checkStartTime");

const express = require("express");
const router = express.Router();

router.get('/', checkTime, checkStartTime, isVerified, (req, res) => {
  res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
  const { iDecipherToken } = req.cookies;
  Teams.findById(iDecipherToken, (err, team) => {
    res.redirect(`/question/${team.current}`);
  })
})

module.exports = router;
