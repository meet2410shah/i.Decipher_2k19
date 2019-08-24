const Teams = require('../database/models/teams');

const redirectQuestion = (req, res, next) => {
    const { iDecipherToken } = req.cookies;
    if(iDecipherToken) {
      Teams.findById(iDecipherToken, (err, team) => {
        if(team) {
          return res.redirect('/questions');
        } else {
          res.cookie('iDecipherToken', '');
          return res.redirect('/signup');
        }
      });
    } else {
      return next();
    }
}
  
module.exports = redirectQuestion;