'use strict'
//This table indicate the coin's type and amount a user currently hold 
module.exports = (sequelize, DataTypes) => {
  var Coin = sequelize.define('Coin', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      unique: true
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    }
  }, {});
  Coin.associate = function(models) {
    Coin.belongsTo(models.Portfolio, {
      foreignKey: 'portfolioId',
      onDelete: 'CASCADE',
    });
  };
  return Coin;
};