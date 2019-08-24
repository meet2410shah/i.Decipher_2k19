const checkTime = require("../middleware/checkTime");
const isVerified = require('../middleware/isVerified');
const checkCurrent = require('../middleware/checkCurrent');
const Teams = require('../database/models/teams');

const express = require("express");
const router = express.Router();

router.get('/',checkTime, isVerified, checkCurrent, (req, res) => {
  res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.redirect('/questions');
})

router.get('/:id', checkTime, isVerified, checkCurrent, (req, res) => {
  res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
  const { iDecipherToken } = req.cookies;
  Teams.findById(iDecipherToken, (err, team) => {
    if(team.current > 20) {
      return res.redirect('/thankyou');
    }
    if(req.params.id == team.current) {
      res.send(`
      Question:${req.params.id}
      <form action='/question/${team.current}' method="POST">
        <input type="text" name="answer">
        <button>Answer</button>
      </form>
      <form action='/question/skip/${team.current}' method="POST">
        <button>Skip</button>
      </form>
      <script src="../js/question.js"></script>
      `);
    } else {
      res.redirect(`/question/${team.current}`);
    }
  })
})

router.post('/:id', checkTime, isVerified, checkCurrent, (req, res) => {
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
        let answers = team.answers;
        answers.push(answer);
        Teams
          .findOneAndUpdate({_id:iDecipherToken}, {answers}, {new:true})
          .then((team) => {
            if(team.current > 20) {
              return res.redirect('/thankyou');
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

router.get('/skip/:id', checkTime, isVerified, checkCurrent, (req, res) => {
  res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
  Teams.findById(iDecipherToken, (err, team) => {
    res.redirect(`/${team.current}`);
  })
});

router.post('/skip/:id', checkTime, isVerified, (req, res) => {
  res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
  const {answer} = req.body;
  const { iDecipherToken } = req.cookies;
  let current = req.params.id;
  if(answer) {
    return res.redirect(`/${current}`);
  } else {
    current++;
  }
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
});

module.exports = router;
