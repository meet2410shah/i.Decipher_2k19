
// Configuration File
const config = require('config');
const SECRET_KEY = config.get('IDECIPHER.SECRET_KEY');

// Special Functions and Modules
const jwt = require('jsonwebtoken');

const checkLoggedIn = (req, res, next) => {
    const { iDecipherToken } = req.cookies;
    if(iDecipherToken) {
      jwt.verify(iDecipherToken, SECRET_KEY, (err, authData) => {
        if(err) {
          return res.redirect('/unautherized');
        } else {
          return res.redirect('/dashboard');
        }
      });
    } else {
      return next();
    }
}
module.exports = checkLoggedIn