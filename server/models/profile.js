'use strict';
module.exports = (sequelize, DataTypes) => {
  var Profile = sequelize.define('Profile', {
    email: DataTypes.STRING,
    github: DataTypes.STRING,
    interest: DataTypes.STRING,
    investment: DataTypes.STRING
  }, {});
  Profile.associate = function(models) {
    Profile.belongsTo(models.User, {
      foreignKey: 'userId',
      //If we delete a user, its profile should be deleted as well
      //cascade the delete action
      onDelete: 'CASCADE',
    });
  };
  return Profile;
};