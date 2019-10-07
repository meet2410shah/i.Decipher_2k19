// Configuration File
const config = require(`config`);
const SECRET_KEY = config.get(`IDECIPHER.SECRET_KEY`);

// Modules and Helper Functions
const jwt = require(`jsonwebtoken`);

// Middleware Definition
const checkIdentity = (req, res, next) => {
  const { iDecipherToken } = req.cookies;
  if (!iDecipherToken) {
    return next();
  } else {
    jwt.verify(iDecipherToken, SECRET_KEY, (err, authData) => {
      if (err) {
        return res.status(401).redirect(`/unautherized`);
      } else {
        const { _id } = authData.team;
        res.locals._id = _id;
        return next();
      }
    });
  }
};

module.exports = checkIdentity;
