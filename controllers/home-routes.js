const router = require("express").Router();
const withAuth = require('../utils/auth');
const { Post, User, Comment } = require('../models');

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




// Route for displaying all posts
router.get('/post', withAuth, async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [{ model: User, attributes: ['username'] }],
      order: [['createdAt', 'DESC']],
    });
    console.log(posts);
    const postData = posts.map((post) => post.get({ plain: true }));
    res.render('post', { posts: postData });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


//homepage route
router.get('/', async (req, res) => {
  try {
    // Fetch all posts from the database, including the user who created each post
    const posts = await Post.findAll({
      include: [
        { model: User, attributes: ['username'] },
        { model: Comment, include: [{ model: User, attributes: ['username'] }] }
      ],
      order: [['createdAt', 'DESC']],
    });
    const postData = posts.map((post) => post.get({ plain: true }));

    // Pass the posts data to the template context
    res.render('homepage', { posts: postData, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});





module.exports = router;
