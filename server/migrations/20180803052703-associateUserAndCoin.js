'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn('Users', 'coinsId', Sequelize.ARRAY(Sequelize.Integer))
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
