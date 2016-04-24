'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      location: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      coughing: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      sneezing: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      itchyeyesandnose: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      sorethroat: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      shortnessofbreath: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      wateryeyes: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      stuffynose: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Users');
  }
};