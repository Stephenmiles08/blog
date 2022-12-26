'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    'Post', {
      title: DataTypes.STRING,
      content: DataTypes.TEXT,
      userId: DataTypes.INTEGER
    }, {});

  Post.associate = function (models) {
    Post.hasMany(models.Like, {
      foreignKey: 'postId',
      as: 'likedPost',
      onDelete: 'CASCADE'
    });

    Post.hasMany(models.Comment, {
      foreignKey: 'postId',
      as: 'commentedOn',
      onDelete: 'CASCADE'
    })

    Post.belongsTo(models.users, {
      foreignKey: 'userId',
      as: 'author',
      onDelete: 'CASCADE'
    })
  }
  return Post;
};