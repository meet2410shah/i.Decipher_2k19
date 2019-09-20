// Configuration File
const config = require('config');
const EVENT_END_DATE = config.get('IDECIPHER.EVENT_END_TIME');
const EVENT_START_TIME = config.get("IDECIPHER.EVENT_START_TIME");
const DURATION = config.get('IDECIPHER.EVENT_DURATION');

// Express Router Setup 
const express = require("express");
const router = express.Router();

// Database Connection
const Teams = require('../database/models/teams');

// Middleware Functions
const validateDetails = require('../middleware/validateDetails');
const checkLoggedIn = require('../middleware/checkLoggedIn');
const checkEventEndTime = require('../middleware/checkEventEndTime');

// Special Functions and Modules
const jwt = require('jsonwebtoken');
const calculateTime = require('../helper/calculateTime');
const bcrypt = require('bcrypt');
const saltRound = 10;

const registerationClosed = (req, res, next) => {
  const EVENT_START = new Date(EVENT_START_TIME);
  const time = calculateTime(EVENT_START);
  if (time.err) {
    return res.render("sorry");
  } else {
    next();
  }
}

router.get("/", checkEventEndTime, registerationClosed, checkLoggedIn, (req, res) => {
  res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.render("signup", {
    err: null,
    time: calculateTime(new Date(EVENT_END_DATE))
  })
});

router.post("/", checkEventEndTime, checkLoggedIn, validateDetails, (req, res) => {
  res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
  const { name1, name2, teamName, email, phone, password } = req.body;
  bcrypt.genSalt(saltRound, function(err, salt) {
    bcrypt.hash(password, salt, function(err, hash) {
      const Team = new Teams({
        name1,
        name2,
        teamName,
        email,
        password: hash,
        phone,
        isVerified: false
      });
      Team.save()
        .then((result) => {
          if(result) {
            jwt.sign({ result }, 'iDecipherToken', { expiresIn: DURATION }, (err, token) => {
              res.cookie('iDecipherToken', token, { maxAge: DURATION });
              return res.redirect('/rules');
            });
          } else {
            return res.status(403).render('signup', {
              err: {
                msg: 'User with the given email is already existed.',
                code: 403
              },
              time: calculateTime(new Date(EVENT_END_DATE))
            });
          }
        })
        .catch(e => {
          return res.render('signup', {
            err: {
              msg: e.errmsg,
              code: 1020
            },
            time: calculateTime(new Date(EVENT_END_DATE))
          });
        });
    });
  });
});

module.exports = router;
