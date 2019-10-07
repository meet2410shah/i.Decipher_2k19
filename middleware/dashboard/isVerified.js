// Database connection
const Teams = require(`../../database/models/teams`);

const isVerified = (req, res, next) => {
  const { _id } = res.locals;
  if (!_id) {
    return res.status(401).redirect(`/login`);
  } else {
    Teams.findById({ _id }, (err, team) => {
      if (err || !team) {
        return res.status(406).redirect(`/unautherized`);
      }
      if (team.isVerified === true) {
        return next();
      } else {
        return res.status(403).redirect(`/rules`);
      }
    });
  }
};

module.exports = isVerified;
