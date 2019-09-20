// Configuration File
const config = require('config');
const DURATION = config.get('IDECIPHER.EVENT_DURATION');
const EVENT_END_DATE = config.get('IDECIPHER.EVENT_END_TIME');

// Express Router Setup
const express = require("express");
const router = express.Router();

// Middleware Functions
const checkEventEndTime = require("../middleware/checkEventEndTime");
const isVerified = require('../middleware/isVerified');
const checkCurrent = require('../middleware/checkCurrent');
const checkStartTime = require("../middleware/checkStartTime");

// Database connection
const Teams = require('../database/models/teams');

// Special Functions and Modules
const jwt = require('jsonwebtoken');
const calculateTime = require('../helper/calculateTime');

// Router Definition
router.get('/',checkEventEndTime, checkStartTime, isVerified, checkCurrent, (req, res) => {
  res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.redirect('/questions');
})

router.get('/:id', checkEventEndTime,checkStartTime,  isVerified, checkCurrent, (req, res) => {
  res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
  const { iDecipherToken } = req.cookies;
  jwt.verify(iDecipherToken, 'iDecipherToken', (err, authData) => {
    if(err) {
      return res.status(403).redirect('/unautherized');
    } else {
      const { _id } = authData.team;
      Teams.findById(_id, (err, team) => {
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
            },
            time: calculateTime(new Date(EVENT_END_DATE))
          });
        } else {
          res.redirect(`/question/${team.current}`);
        }
      })    
    }
  });
})

router.post('/:id', checkEventEndTime, checkStartTime, isVerified, checkCurrent, (req, res) => {
  res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
  const {answer} = req.body;
  const { iDecipherToken } = req.cookies;
  let current = req.params.id;
  if(!answer) {
    res.redirect(`/question/${current}`);
  } else {
    current++;
    jwt.verify(iDecipherToken, 'iDecipherToken', (err, authData) => {
      if(err) {
        return res.status(403).redirect('/unautherized');
      } else {
        const { _id } = authData.team;
        Teams
          .findOneAndUpdate({_id: _id}, {current}, {new:true})
          .then((team) => {
            let ans = {answer}
            let answers = team.answers;
            answers.push(ans);
            Teams
              .findOneAndUpdate({_id:_id}, {answers}, {new:true})
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
    });
  }
})

router.get('/skip/:id', checkEventEndTime, checkStartTime, isVerified, checkCurrent, (req, res) => {
  res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.redirect('/questions');
});

router.post('/skip/:id', checkEventEndTime,checkStartTime,  isVerified, (req, res) => {
  res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
  const {answer} = req.body;
  const { iDecipherToken } = req.cookies;
  let current = req.params.id;
  if(answer) {
    return res.redirect(`/${current}`);
  } else {
    current++;
    jwt.verify(iDecipherToken, 'iDecipherToken', (err, authData) => {
      if(err) {
        return res.status(403).redirect('/unautherized');
      } else {
        const { _id } = authData.team;
        Teams
          .findOneAndUpdate({ _id : _id }, { current }, { new : true })
          .then((team) => {
            let answers = team.answers;
            answers.push(null);
            Teams
              .findOneAndUpdate({_id : _id}, {answers}, {new:true})
              .then((team) => {
                if(team) {
                  if(team.current > 20) {
                    return res.render('thankyou');
                  }
                  res.redirect(`/question/${current}`);
                } else {
                  res.send('Unauthorised team error');
                }
              });
          });
      }
    });
  };
});

module.exports = router;
