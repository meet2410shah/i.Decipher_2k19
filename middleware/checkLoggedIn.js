const checkLoggedIn = (req, res, next) => {
    if (!req.session) {
      return res.redirect("/login");
    }
    next();
};

module.exports = checkLoggedIn