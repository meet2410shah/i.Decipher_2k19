// Configuration file
const config = require("config");
const DURATION = config.get("IDECIPHER.EVENT_DURATION");
const EVENT_START_DATE = config.get("IDECIPHER.EVENT_START_TIME");
const SECRET_KEY = config.get("IDECIPHER.SECRET_KEY");

// Express Router Setup
const express = require("express");
const router = express.Router();

// Database Connection
const Teams = require("../database/models/teams");

// Middleware Functions
const { checkLoggedIn } = require("../middleware/login/main");

// Helper Functions and Modules
const calculateTime = require("../helper/calculateTime");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Middleware for the router
router.use(checkLoggedIn);

// Router Definition
router.get(`/`, (req, res) => {
  res.set(`Cache-Control`, `no-cache, no-store, must-revalidate`);
  res.render(`login`, {
    err: null,
    team: null,
    time: calculateTime(new Date(EVENT_START_DATE))
  });
});

router.post(`/`, (req, res) => {
  res.set(`Cache-Control`, `no-cache, no-store, must-revalidate`);
  const { teamName, password } = req.body;
  Teams.findOne({ teamName }).then(team => {
    if (!team) {
      return res.render(`login`, {
        err: {
          msg: `No such team with the name ${teamName} is existed.`,
          code: 601
        },
        team: null,
        time: calculateTime(new Date(EVENT_START_DATE))
      });
    }
    bcrypt.compare(password, team.password, (err, ans) => {
      if (ans == true) {
        jwt.sign(
          { team },
          SECRET_KEY,
          { expiresIn: DURATION },
          (err, token) => {
            res.cookie(`iDecipherToken`, token, { maxAge: DURATION });
            return res.redirect(`/question/${team.current}`);
          }
        );
      } else {
        return res.render(`login`, {
          err: {
            msg: `Password is incorrect. Please enter the correct password.`,
            code: 602
          },
          team,
          time: calculateTime(new Date(EVENT_START_DATE))
        });
      }
    });
  });
});

module.exports = router;
