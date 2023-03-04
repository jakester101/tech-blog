const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

Post.belongsTo(User);
User.hasMany(Post);

module.exports = {
     User,
     Post,
     Comment,
};

