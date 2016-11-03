export function up(queryInterface, Sequelize) {
  return queryInterface.changeColumn('users', 'dce', {
    type: Sequelize.STRING(7),
    allowNull: false,
  });
}

export function down(queryInterface, Sequelize) {
  return queryInterface.changeColumn('users', 'dce', {
    type: Sequelize.STRING,
    allowNull: false,
  });
}
