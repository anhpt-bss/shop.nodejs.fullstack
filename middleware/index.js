let middlewareObject = {};

//a middleware to check if a user is logged in or not
middlewareObject.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
};

middlewareObject.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/user/signin");
};

// a middleware to save previous page to session
middlewareObject.savePreviousPage = (req, res, next) => {
  req.session.oldUrl = req.originalUrl || '/';
  next();
};

module.exports = middlewareObject;
