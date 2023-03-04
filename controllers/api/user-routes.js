const router = require("express").Router();
const { User } = require("../../models");

router.get("/", async (req, res) => {
  try {
    const userData = await User.findAll({});
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(userData);
  }
});

// CREATE new user
router.post("/", async (req, res) => {
  try {
    const dbUserData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    req.session.loggedIn = true;
    req.session.save(() => {
    res.status(200).json(dbUserData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
        password: req.body.password
      },
    });

    if (!user) {
      res.status(400).json({ message: 'Incorrect email or password, please try again' });
      return;
    }


    // set loggedIn to true on successful login
    req.session.loggedIn = true;
    req.session.save(() => {
      res.json({ user: user, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


// Logout
router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
