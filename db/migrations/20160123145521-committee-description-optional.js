export function up(queryInterface, Sequelize) {
  return queryInterface.changeColumn('committees', 'description', {
    type: Sequelize.TEXT,
    allowNull: true,
  });
}

export function down(queryInterface, Sequelize) {
  return queryInterface.changeColumn('committees', 'description', {
    type: Sequelize.TEXT,
    allowNull: false,
  });
}
