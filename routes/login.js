const config = require('config');
const express = require('express');
const router = express.Router();
const Teams = require('../database/models/teams');

const checkLoggedIn = require('../middleware/checkLoggedIn');
const redirectQuestion = require('../middleware/redirectQuestion');
const checkTime = require("../middleware/checkTime");

router.get("/", checkTime, redirectQuestion, (req, res) => {
  res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.render("login");
});

router.post("/", checkTime, redirectQuestion, (req, res) => {
  res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
  const { teamName, password } = req.body;
    Teams.findOne({ teamName }).then((team) => {
      if(!team) {
        return res.render('login', {
          err: {
            msg: "No such team with the given name is existed.",
            code: 601
          }
        })
      }
      if(team.password === password) {
        res.cookie("iDecipherToken", team._id);
        return res.redirect('/question');
      } else {
        res.render('login', {
          err: {
            msg: "Incorrect Password",
            code: 604
          }
        })
      }
    });
});

module.exports = router;