const config = require('config');
const express = require("express");
const router = express.Router();
const Teams = require('../database/models/teams');

// Middleware
const validateDetails = require('../middleware/validateDetails');
const redirectQuestion = require('../middleware/redirectQuestion');
const checkTime = require('../middleware/checkTime')

router.get("/", checkTime, redirectQuestion, (req, res) => {
  res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.render("signup", {
    err: null
  })
});

router.post("/", checkTime, redirectQuestion, validateDetails, (req, res) => {
  res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
  const { name1, name2, teamName, email, phone, password } = req.body;
  const Team = new Teams({
    name1,
    name2,
    teamName,
    email,
    password,
    phone,
    isVerified: false
  });
  Team.save()
  .then((result) => {
    if(result) {
      res.cookie("iDecipherToken", result._id);
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
    })
  });
});

module.exports = router;
