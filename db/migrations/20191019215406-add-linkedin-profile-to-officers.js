export function up(queryInterface, Sequelize) {
  return queryInterface.addColumn('officers', 'linkedinUrl', {
    type: Sequelize.TEXT,
    allowNull: true,
  });
}

export function down(queryInterface) {
  return queryInterface.removeColumn('officers', 'linkedinUrl');
}
