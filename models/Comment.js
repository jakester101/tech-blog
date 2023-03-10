const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const User = require('./User');
const Post = require('./Post');


class Comment extends Model {}

Comment.init(
{
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'user',  // name of the target model
      key: 'id'       // key in the target model
    }
  },
  contents: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  post_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'posts',
      key: 'id',
    },
  },
},
{
  sequelize,
  timestamps: false,
  freezeTableName: true,
  underscored: true,
  modelName: "comments",
}
);

Comment.belongsTo(User);
User.hasMany(Comment);

Comment.belongsTo(Post);
Post.hasMany(Comment);

module.exports = Comment;
