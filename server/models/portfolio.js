module.exports = (sequelize, DataTypes) => {
  var Portfolio = sequelize.define('Portfolio', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        unique: true
      },
  }, {});

  Portfolio.associate = function(models) {
    Portfolio.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
    Portfolio.hasMany(models.Coin, {
        foreignKey: 'portfolioId',
        as: 'coin',
    })
    Portfolio.hasMany(models.Transaction, {
        foreignKey: 'portfolioId',
        as: 'transaction',
    })
  };
  return Portfolio;
};