// Middleware Definition
const isLoggedIn = (req, res, next) => {
  const { team } = res.locals;
  if (!team) {
    return res.status(404).redirect(`/login`);
  } else {
    return next();
  }
};

module.exports = isLoggedIn;
