const router = require("express").Router();
const apiRoutes = require("./api");
const homeRoutes = require("./home-routes.js");


router.use("/", homeRoutes);
router.use("/api", apiRoutes);
const withAuth = require('../utils/auth');


router.get('/',  async (req, res) => {
  try {
    // Pass loggedIn variable to template context
    res.render('homepage', { loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});



router.get("/forgotpassword", (req, res) => {
  res.render("forgotpassword");
});

module.exports = router;
