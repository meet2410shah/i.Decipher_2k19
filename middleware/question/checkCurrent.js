// Middleware Definition
const checkCurrent = (req, res, next) => {
  const { team } = res.locals;
  if (!team) {
    return res.status(401).redirect(`/login`);
  } else {
    const { current } = req.params;
    if (parseInt(team.current) === parseInt(current)) {
      return next();
    } else {
      if (team.current > 20) {
        return res.render(`thankyou`);
      } else {
        return res.redirect(`/question/${team.current}`);
      }
    }
  }
};

module.exports = checkCurrent;
