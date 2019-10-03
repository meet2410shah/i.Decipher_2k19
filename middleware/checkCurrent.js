// Middleware Definition
const checkCurrent = (req, res, next) => {
  const { team } = res.locals;
  if (!team) {
    return res.status(404).redirect(`/login`);
  } else {
    const { current } = req.params;
    if (parseInt(team.current) === parseInt(current)) {
      if (team.current >= 20) {
        return res.redirect(`/thankyou`);
      } else {
        return next();
      }
    } else {
      return res.redirect(`/question/${team.current}`);
    }
  }
};

module.exports = checkCurrent;
