module.exports = (sequelize, DataTypes) => {
    var Coin = sequelize.define('Coin', {
      id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        unique: true
      },
      type: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      amount: {
        type: DataTypes.INTEGER,
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