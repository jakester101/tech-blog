const router = require("express").Router();
const withAuth = require('../utils/auth');

// Login route
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login", {
    loggedIn: req.session.loggedIn,
  });
});

// Player Search Route
router.get("/playersearch", withAuth, async (req, res) => {
  try {
    res.render("search");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
