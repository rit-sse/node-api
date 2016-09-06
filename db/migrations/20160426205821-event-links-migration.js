module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.addColumn('events', 'link', { type: Sequelize.STRING, allowNull: true });
  },

  down(queryInterface, Sequelize) {
    return queryInterface.removeColumn('events', 'link');
  }
};
