module.exports = (sequelize, DataTypes) => {
    var Transaction = sequelize.define('Transaction', {
        id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
            unique: true
          },
        sell_type: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }, 
        sell_price: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        sell_amount: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        }, 
        income_type: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        income_price: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        income_amount: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        }
    }, {});
    Transaction.associate = function(models) {
      Transaction.belongsTo(models.Portfolio, {
        foreignKey: 'portfolioId',

        onDelete: 'CASCADE',
      });
    };
    return Transaction;
  };