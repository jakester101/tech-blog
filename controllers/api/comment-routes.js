const router = require('express').Router();
const { Comment, User } = require('../../models');
const withAuth = require('../../utils/auth');


router.post('/', withAuth, async (req, res) => {
  try {
    if (!req.session.userId) {
      throw new Error('User is not logged in');
    }

    const username = await getUsername(req.session.userId);

    const newComment = await Comment.create({
      contents: req.body.comment_text,
      user_id: req.session.userId,
      post_id: req.body.post_id,
    });

    const data = newComment.toJSON();
    data.username = username;

    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


const getUsername = async (userId) => {
  const user = await User.findOne({ where: { id: userId } });
  return user.username;
};



module.exports = router;
