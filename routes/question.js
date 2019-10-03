// Configuration File
const config = require(`config`);
const EVENT_END_DATE = config.get(`IDECIPHER.EVENT_END_TIME`);

// Express Router Setup
const express = require(`express`);
const router = express.Router();

// Middleware Functions
const checkEventEndTime = require(`../middleware/checkEventEndTime`);
const isVerified = require(`../middleware/isVerified`);
const checkCurrent = require(`../middleware/checkCurrent`);
const checkStartTime = require(`../middleware/checkStartTime`);
const isLoggedIn = require(`../middleware/isLoggedIn`);

// Database connection
const Teams = require(`../database/models/teams`);

// Special Functions and Modules
const calculateTime = require(`../helper/calculateTime`);
const fs = require(`fs`);
const path = require(`path`);

// Router Definition
router.get(
  `/`,
  checkEventEndTime,
  checkStartTime,
  isVerified,
  isLoggedIn,
  (req, res) => {
    res.set(`Cache-Control`, `no-cache, no-store, must-revalidate`);
    res.redirect(`/questions`);
  }
);

const getPath = current => {
  const dir = __dirname;
  const predir = dir.slice(0, dir.length - 7);
  const file = current + ".txt";
  return path.join(predir, "public", "question", file);
};

const generateData = current => {
  const text = fs.readFileSync(getPath(current), `utf8`);
  return {
    path: `/question/${current}.jpg`,
    current: `${current}`,
    skipAction: `/question/skip/${current}`,
    action: `/question/${current}`,
    text
  };
};

router.get(
  `/:current`,
  checkEventEndTime,
  checkStartTime,
  isLoggedIn,
  isVerified,
  checkCurrent,
  (req, res) => {
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
  }
);

const isValidAnswer = answer => {
  if (answer.length > 20) {
    return false;
  } else {
    return true;
  }
};

router.post(
  `/:current`,
  checkEventEndTime,
  checkStartTime,
  isLoggedIn,
  isVerified,
  checkCurrent,
  (req, res) => {
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
          return res.redirect(`/questions/${current}`);
        })
        .catch(e => {
          console.log(e);
          res.redirect(`/question/${current}`);
        });
    }
  }
);

router.get(
  `/skip/:current`,
  checkEventEndTime,
  checkStartTime,
  isLoggedIn,
  isVerified,
  checkCurrent,
  (req, res) => {
    res.set(`Cache-Control`, `no-cache, no-store, must-revalidate`);
    res.redirect(`/questions`);
  }
);

router.post(
  `/skip/:current`,
  checkEventEndTime,
  checkStartTime,
  isLoggedIn,
  isVerified,
  checkCurrent,
  (req, res) => {
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
  }
);

module.exports = router;
