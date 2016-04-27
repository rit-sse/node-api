'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('events', 'link', { type: Sequelize.STRING, allowNull: true }); 
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('events', 'link');
  }
};
