'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define(
    'Like', {
      userId: DataTypes.INTEGER,
      postId: DataTypes.INTEGER
    }, {});

  Like.associate = function (models) {
    Like.belongsTo(models.users, {
      foreignKey: 'userId',
      as: 'like',
      onDelete: 'CASCADE'
    })

    Like.belongsTo(models.Post, {
      foreignKey: 'postId',
      as: 'likes',
      onDelete: 'CASCADE'
    })
  }
  return Like;
};