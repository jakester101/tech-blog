const router = require('express').Router();
const { Post, User } = require('../../models');
const withAuth = require('../../utils/auth');


// CREATE new post
router.post('/', async (req, res) => {
  try {
    // Create the new post in the database
    const post = await Post.create({
      title: req.body.title,
      contents: req.body.contents,
      UserId: req.session.userId, // Get the logged-in user's ID from the session
    });

    // Fetch the new post from the database, including the user who created it
    const newPost = await Post.findOne({
      where: { id: post.id },
      include: [{ model: User, attributes: ['username'] }],
    });

    res.status(200).json(newPost);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});










module.exports = router;
