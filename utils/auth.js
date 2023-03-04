const withAuth = (req, res, next) => {
    // If the user isn't logged in, redirect them to the login route
    if (!req.session.loggedIn) {
      res.redirect('/login');
    } else {
      res.locals.loggedIn = req.session.loggedIn; // pass loggedIn to template context
      next();
    }
  };
  
  module.exports = withAuth;
  