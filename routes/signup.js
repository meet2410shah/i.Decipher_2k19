// Configuration File
const config = require(`config`);
const EVENT_START_TIME = config.get(`IDECIPHER.EVENT_START_TIME`);
const DURATION = config.get(`IDECIPHER.EVENT_DURATION`);
const SECRET_KEY = config.get(`IDECIPHER.SECRET_KEY`);

// Express Router Setup
const express = require("express");
const router = express.Router();

// Database Connection
const Teams = require("../database/models/teams");

// Middleware Functions
const {
  checkLoggedIn,
  registrationClosed,
  validateDetails
} = require("../middleware/signup/main");

// Special Functions and Modules
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const calculateTime = require("../helper/calculateTime");

// Variables Declaration
const saltRound = 10;

router.use(checkLoggedIn);
router.use(registrationClosed);

router.get(`/`, (req, res) => {
  res.set(`Cache-Control`, `no-cache, no-store, must-revalidate`);
  res.render(`signup`, {
    err: null,
    time: calculateTime(new Date(EVENT_START_TIME))
  });
});

router.post(`/`, validateDetails, (req, res) => {
  res.set(`Cache-Control`, `no-cache, no-store, must-revalidate`);
  const { name1, name2, teamName, email, phone, password } = req.body;
  bcrypt.genSalt(saltRound, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
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
        .then(team => {
          jwt.sign(
            { team },
            SECRET_KEY,
            { expiresIn: DURATION },
            (err, token) => {
              res.cookie(`iDecipherToken`, token, { maxAge: DURATION });
              return res.render(`success`);
            }
          );
        })
        .catch(e => {
          return res.render(`signup`, {
            err: {
              msg: e.errmsg,
              code: 604
            },
            team,
            time: calculateTime(new Date(EVENT_START_TIME))
          });
        });
    });
  });
});

module.exports = router;
