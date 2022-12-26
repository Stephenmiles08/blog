'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    'comments', {
      userId: DataTypes.INTEGER,
      postId: DataTypes.INTEGER,
      comment: DataTypes.TEXT
    }, {});

  Comment.associate = function (models) {
    Comment.belongsTo(models.users, {
      foreignKey: 'userId',
      as: 'author',
      onDelete: 'CASCADE'
    });

    Comment.belongsTo(models.posts, {
      foreignKey: 'postId',
      as: 'post',
      onDelete: 'CASCADE'
    })
  }


  return Comment;
};