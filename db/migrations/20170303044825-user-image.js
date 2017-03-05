export function up(queryInterface, Sequelize) {
  return queryInterface.addColumn('users', 'image', Sequelize.STRING);
}

export function down(queryInterface) {
  return queryInterface.removeColumn('users', 'image');
}
