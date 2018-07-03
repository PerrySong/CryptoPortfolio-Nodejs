module.exports = (sequelize, DataTypes) => {
  var Portfolio = sequelize.define('Portfolio', {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        unique: true
      },
  }, {});
  
  Portfolio.associate = function(models) {
    Portfolio.belongsTo(models.User, {
      foreignKey: 'userId',
      //If we delete a user, its profile should be deleted as well
      //cascade the delete action
      onDelete: 'CASCADE',
    });
    Portfolio.hasMany(models.Coin, {
        foreignKey: 'portfolioId',
        as: 'coin',
    })
    Protfolio.hasMany(models.Transaction, {
        foreignKey: 'portfolioId',
        as: 'transaction',
    })
  };
  return Portfolio;
};