'use strict'
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    public: {
      defaultValue: true,
      type: DataTypes.BOOLEAN,
    },
    administrator: {
      defaultValue: false,
      type: DataTypes.BOOLEAN,
    }
  });
  User.associate = function(models) {
    // associations can be defined here
    User.hasOne(models.Profile, {
      foreignKey: 'userId',
      as: 'profile',// Now I will get User.getProfile and User.setProfile
    })
    User.hasOne(models.Portfolio, {
      foreignKey: 'userId',
      as: 'portfolio',
    })
  };
  return User;
};