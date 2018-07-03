'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Transactions', {
      id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
        unique: true
      },
      sell_type: {
          type: Sequelize.INTEGER,
          allowNull: false,
      }, 
      sell_price: {
          type: Sequelize.DOUBLE,
          allowNull: false,
      },
      sell_amount: {
          type: Sequelize.DOUBLE,
          allowNull: false,
      }, 
      income_type: {
          type: Sequelize.INTEGER,
          allowNull: false,
      },
      income_price: {
          type: Sequelize.DOUBLE,
          allowNull: false,
      },
      income_amount: {
          type: Sequelize.DOUBLE,
          allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
    });
  },  
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Transactions');
  }
};
