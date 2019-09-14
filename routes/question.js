const checkTime = require("../middleware/checkTime");
const isVerified = require('../middleware/isVerified');
const checkCurrent = require('../middleware/checkCurrent');
const Teams = require('../database/models/teams');
const fs = require('fs');
const checkStartTime = require("../middleware/checkStartTime");

const express = require("express");
const router = express.Router();

router.get('/',checkTime, checkStartTime, isVerified, checkCurrent, (req, res) => {
  res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.redirect('/questions');
})

router.get('/:id', checkTime,checkStartTime,  isVerified, checkCurrent, (req, res) => {
  res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
  const { iDecipherToken } = req.cookies;
  Teams.findById(iDecipherToken, (err, team) => {
    if(!team) {
      return res.redirect('/unautherized');
    }
    if(team.current > 20) {
      return res.render('thankyou');
    }
    if(req.params.id == team.current) {
      res.render('question', {
        data: {
          path: `/question/${team.current}.jpg`,
          current: `${team.current}`,
          skipAction: `/question/skip/${team.current}`,
          action: `/question/${team.current}`
        }
      });
    } else {
      res.redirect(`/question/${team.current}`);
    }
  })
})

router.post('/:id', checkTime, checkStartTime, isVerified, checkCurrent, (req, res) => {
  res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
  const {answer} = req.body;
  const { iDecipherToken } = req.cookies;
  let current = req.params.id;
  if(!answer) {
    res.redirect(`/question/${current}`);
  } else {
    current++;
    Teams
      .findOneAndUpdate({_id:iDecipherToken}, {current}, {new:true})
      .then((team) => {
        let ans = {answer}
        let answers = team.answers;
        answers.push(ans);
        Teams
          .findOneAndUpdate({_id:iDecipherToken}, {answers}, {new:true})
          .then((team) => {
            if(team.current > 20) {
              return res.render('thankyou');
            }
            if(team) {
              res.redirect(`/question/${current}`);
            } else {
              res.send('Unauthorised team error');
            }
          })
      });
  }
})

router.get('/skip/:id', checkTime, checkStartTime, isVerified, checkCurrent, (req, res) => {
  res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
  Teams.findById(iDecipherToken, (err, team) => {
    res.redirect(`/${team.current}`);
  })
});

router.post('/skip/:id', checkTime,checkStartTime,  isVerified, (req, res) => {
  res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
  const {answer} = req.body;
  const { iDecipherToken } = req.cookies;
  let current = req.params.id;
  if(answer) {
    return res.redirect(`/${current}`);
  } else {
    current++;
    Teams
    .findOneAndUpdate({ _id : iDecipherToken }, { current }, { new : true })
    .then((team) => {
      let answers = team.answers;
      answers.push(null);
      Teams
        .findOneAndUpdate({_id:iDecipherToken}, {answers}, {new:true})
        .then((team) => {
          if(team) {
            if(team.current > 20) {
              return res.redirect('/thankyou');
            }
            res.redirect(`/question/${current}`);
          } else {
            res.send('Unauthorised team error');
          }
        });
    });
  };
});

module.exports = router;
