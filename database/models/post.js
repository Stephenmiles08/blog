'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    'posts', {
      title: DataTypes.STRING,
      content: DataTypes.TEXT,
      keyword: DataTypes.STRING,
      category: DataTypes.STRING,
      userAuthor: DataTypes.STRING,
      userId: DataTypes.INTEGER
    }, {});

  Post.associate = function (models) {
    Post.hasMany(models.likes, {
      foreignKey: 'postId',
      as: 'likedPost',
      onDelete: 'CASCADE'
    });

    Post.hasMany(models.comments, {
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