const router = require("express").Router();
const withAuth = require('../utils/auth');
const { Post, User } = require('../models');

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

// User Post Route
// router.get("/post", withAuth, async (req, res) => {
//   try {
//     res.render("post");
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });


// Route for displaying all posts
router.get('/post', withAuth, async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [{ model: User, attributes: ['username'] }],
      order: [['createdAt', 'DESC']],
    });
    const postData = posts.map((post) => post.get({ plain: true }));
    res.render('post', { posts: postData });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});




module.exports = router;
