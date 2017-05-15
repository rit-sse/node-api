export function up(queryInterface, Sequelize) {
  return queryInterface.addColumn('events', 'link', { type: Sequelize.STRING, allowNull: true });
}

export function down(queryInterface) {
  return queryInterface.removeColumn('events', 'link');
}
