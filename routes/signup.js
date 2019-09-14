const config = require('config');
const express = require("express");
const router = express.Router();
const Teams = require('../database/models/teams');

// Middleware
const validateDetails = require('../middleware/validateDetails');
const redirectQuestion = require('../middleware/redirectQuestion');
const checkTime = require('../middleware/checkTime')
const calculateTime = require("./counter/calculateTime");

const EVENT_START_TIME = config.get("IDECIPHER.EVENT_START_TIME");
const registerationClosed = (req, res, next) => {
  const EVENT_START = new Date(EVENT_START_TIME);
  const time = calculateTime(EVENT_START);
  if (time.err) {
    return res.render("sorry");
  } else {
    next();
  }
}

router.get("/", checkTime, registerationClosed, redirectQuestion, (req, res) => {
  res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.render("signup", {
    err: null
  })
});

const bcrypt = require('bcrypt');
const saltRound = 10;

router.post("/", checkTime, redirectQuestion, validateDetails, (req, res) => {
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
            res.cookie("iDecipherToken", result._id, {maxAge: DURATION});
            return res.redirect('/rules');
          } else {
            return res.status(403).render('signup', {
              err: {
                msg: 'User with the given email is already existed.',
                code: 403
              }
            });
          }
        })
        .catch(e => {
          return res.render('signup', {
            err: {
              msg: e.errmsg,
              code: 1020
            }
          });
        });
    });
  });
});

module.exports = router;
