'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        primaryKey: true,
        unique: true,
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      firstname: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lastname: {
        type: Sequelize.STRING,
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
      public: {
        defaultValue: true,
        type: Sequelize.BOOLEAN, 
      },
      subscribes: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      administrator: {
        defaultValue: false,
        type: Sequelize.BOOLEAN,
      },
    });
  },
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('yourTableName', 'firstNewColumnName', Sequelize.STRING)
        .then(_ => queryInterface.addColumn('yourTableName', 'secondNewColumnName', Sequelize.STRING))
        .then(_ => queryInterface.addColumn('yourTableName', 'thirdNewColumnName', Sequelize.STRING));
    },
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};
