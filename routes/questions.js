// Configuration file
const config = require('config');
const SECRET_KEY = config.get('IDECIPHER.SECRET_KEY');

// Express Router Setup
const express = require("express");
const router = express.Router();

// Middleware Functions
const checkEventEndTime = require('../middleware/checkEventEndTime');
const isVerified = require('../middleware/isVerified');
const checkStartTime = require("../middleware/checkStartTime");

// Special Functions and Modules
const jwt = require('jsonwebtoken');

// Router Definition
router.get('/', checkEventEndTime, checkStartTime, isVerified, (req, res) => {
  res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
  const { iDecipherToken } = req.cookies;
  jwt.verify(iDecipherToken, SECRET_KEY, (err, authData) => {
    if(err) {
      return res.status(403).redirect('/unautherized');
    } else {
      const { team } = authData;
      if(team.current > 20) {
        return res.redirect('/thankyou');
      } else {
        return res.redirect(`/question/${team.current}`);
      }
    }
  });
});

module.exports = router;
