'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcrypt')
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('users', {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: async (user) => {
        if (user.password) {
          const salt = await bcrypt.genSaltSync(10, 'a');
          user.password = bcrypt.hashSync(user.password, salt);
        }
      },
      beforeUpdate: async (user) => {
        if (user.password) {
          const salt = await bcrypt.genSaltSync(10, 'a');
          user.password = bcrypt.hashSync(user.password, salt);
        }
      }
    }
  })
  User.prototype.validPassword = async function (password) {
    return await bcrypt.compareSync(password, this.password);
  }
  User.associate = function (models) {
    User.hasMany(models.posts, {
      foreignKey: 'userId',
      as: 'posts',
      onDelete: 'CASCADE'
    });

    User.hasMany(models.comments, {
      foreignKey: 'userId',
      as: 'comments',
      onDelete: 'CASCADE'
    })

    User.hasMany(models.likes, {
      foreignKey: 'userId',
      as: 'like',
      onDelete: 'CASCADE'
    })
  }
  return User;
};