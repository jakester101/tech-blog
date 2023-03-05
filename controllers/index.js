const router = require("express").Router();
const apiRoutes = require("./api");
const homeRoutes = require("./home-routes.js");


router.use("/", homeRoutes);
router.use("/api", apiRoutes);
const withAuth = require('../utils/auth');





router.get("/forgotpassword", (req, res) => {
  res.render("forgotpassword");
});

module.exports = router;
