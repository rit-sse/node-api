export function up(queryInterface, Sequelize) {
  return queryInterface.addColumn('links', 'description', {
    type: Sequelize.STRING,
    allowNull: true,
  })
  .then(() => queryInterface.addColumn('links', 'public', {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  }));
}

export function down(queryInterface) {
  return queryInterface.removeColumn('links', 'description')
  .then(() => queryInterface.removeColumn('links', 'public'));
}
