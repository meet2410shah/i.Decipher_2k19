// Configuration File
const config = require("config");
const EVENT_START_TIME = config.get("IDECIPHER.EVENT_START_TIME");
const EVENT_END_TIME = config.get("IDECIPHER.EVENT_END_TIME");
const SECRET_KEY = config.get(`IDECIPHER.SECRET_KEY`);

// Express Router Setup
const express = require("express");
const router = express.Router();

// Database Connection
const Teams = require('../database/models/teams');

// Helper Functions and Modules
const calculateTime = require("../helper/calculateTime");
const jwt = require('jsonwebtoken');

// Router Definition
router.get("/", (req, res) => {
  res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
  const time1 = calculateTime(new Date(EVENT_START_TIME));
  const time2 = calculateTime(new Date(EVENT_END_TIME));
  if (!time1.err) {
    // Event is not started
    return res.redirect("/dashboard");
  } else {
    // Event is started
    if(time2.err) {
      // Event is completed
      res.status(200).render('thankyou');
    } else {
      // Event is not completed 
      const { iDecipherToken } = req.cookies;
      if(iDecipherToken) {
        jwt.verify(iDecipherToken, SECRET_KEY, (err, authData) => {
          if(err) {
            return res.redirect('/unautherized');
          } else {
            const { _id } = authData.team;
            Teams.findById(_id, (err, team) => {
              if(team.current > 20) {
                return res.status(200).render('thankyou');
              } else {
                return res.redirect(`/questions`);
              }
            })
          }
        });
      } else {
        res.redirect('/login');
      }
    }
  }
});

module.exports = router;
