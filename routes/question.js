// Configuration File
const config = require(`config`);
const EVENT_END_DATE = config.get(`IDECIPHER.EVENT_END_TIME`);

// Express Router Setup
const express = require(`express`);
const router = express.Router();

// Middleware Functions
const {
  isLoggedIn,
  isVerified,
  checkCurrent
} = require(`../middleware/question/main`);

// Database connection
const Teams = require(`../database/models/teams`);

// Helper Functions
const calculateTime = require(`../helper/calculateTime`);
const generateData = require(`../helper/generateData`);
const isValidAnswer = require(`../helper/isValidAnswer`);

// Middleware
router.use(isLoggedIn);
router.use(isVerified);

// Router Definition
router.get(`/`, (req, res) => {
  res.set(`Cache-Control`, `no-cache, no-store, must-revalidate`);
  res.redirect(`/questions`);
});

router.get(`/:current`, checkCurrent, (req, res) => {
  res.set(`Cache-Control`, `no-cache, no-store, must-revalidate`);
  const { team } = res.locals;
  if (!team) {
    return res.redirect(`/login`);
  } else {
    res.render(`question`, {
      data: generateData(team.current),
      time: calculateTime(new Date(EVENT_END_DATE))
    });
  }
});

router.post(`/:current`, checkCurrent, (req, res) => {
  res.set(`Cache-Control`, `no-cache, no-store, must-revalidate`);
  const { team } = res.locals;
  const { answer } = req.body;
  const { current } = team;
  if (!isValidAnswer(answer)) {
    return res.redirect(`/question/${current}`);
  } else {
    const { answers } = team;
    const answerObject = { answer: answer };
    const newAnswers = [...answers, answerObject];
    Teams.findOneAndUpdate(
      { _id: team._id },
      { current: parseInt(current) + 1, answers: newAnswers },
      { new: true }
    )
      .then(team => {
        res.locals = team;
        return res.redirect(`/question/${current}`);
      })
      .catch(e => {
        res.redirect(`/question/${current}`);
      });
  }
});

router.get(`/skip/:current`, checkCurrent, (req, res) => {
  res.set(`Cache-Control`, `no-cache, no-store, must-revalidate`);
  res.redirect(`/questions`);
});

router.post(`/skip/:current`, checkCurrent, (req, res) => {
  res.set(`Cache-Control`, `no-cache, no-store, must-revalidate`);
  const { team } = res.locals;
  const { current, answers } = team;
  const answerObject = { answer: null };
  const newAnswers = [...answers, answerObject];
  Teams.findOneAndUpdate(
    { _id: team._id },
    { current: current + 1, answers: newAnswers },
    { new: true }
  )
    .then(team => {
      res.locals = team;
      return res.redirect(`/question/${current}`);
    })
    .catch(e => {
      res.redirect(`/question/${current}`);
    });
});

module.exports = router;
