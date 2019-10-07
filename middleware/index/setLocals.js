const Teams = require(`../../database/models/teams`);

// Middleware Definition
const setLocals = (req, res, next) => {
  const { _id } = res.locals;
  if (!_id) {
    return next();
  } else {
    Teams.findById(_id, (err, team) => {
      if (err || !team) {
        res.locals._id = null;
        return next();
      } else {
        res.locals.team = team;
        return next();
      }
    });
  }
};

module.exports = setLocals;
