export function up(queryInterface, Sequelize) {
  return queryInterface.changeColumn('officers', 'endDate', {
    type: Sequelize.DATE,
    allowNull: true,
  });
}

export function down(queryInterface, Sequelize) {
  return queryInterface.changeColumn('officers', 'endDate', {
    type: Sequelize.DATE,
    allowNull: false,
  });
}
