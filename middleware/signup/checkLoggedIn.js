// Middleware function definition
const checkLoggedIn = (req, res, next) => {
  const { team } = res.locals;
  if (team) {
    return res.redirect(`/dashboard`);
  } else {
    return next();
  }
};

module.exports = checkLoggedIn;
