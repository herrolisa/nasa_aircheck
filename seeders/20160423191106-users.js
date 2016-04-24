'use strict';
const faker = require('faker');

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
    */

    let users = [];
    let cities = require('../data/cities.json');
    let US = cities["United States"];

    for (let i = 0; i < 200000; i++) {
      users.push({
        location: US[Math.floor(Math.random() * US.length)],
        coughing: Math.floor(Math.random()* 6),
        sneezing: Math.floor(Math.random()* 6),
        itchyeyesandnose: Math.floor(Math.random()* 6),
        sorethroat: Math.floor(Math.random()* 6),
        shortnessofbreath: Math.floor(Math.random()* 6),
        wateryeyes: Math.floor(Math.random()* 6),
        stuffynose: Math.floor(Math.random()* 6),
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    return queryInterface.bulkInsert('Users', users, {});

  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
    */
      return queryInterface.bulkDelete('Users', null, {});

  }
};
