const redirectDashboard = (req, res, next) => {
  const { team } = res.locals;
  if (team) {
    return res.redirect(`/dashboard`);
  }
  next();
};

module.exports = redirectDashboard;
