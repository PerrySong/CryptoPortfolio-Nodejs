'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn('Coins', 'userId', Sequelize.STRING)
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
