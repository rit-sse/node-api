export function up(queryInterface, Sequelize) {
  queryInterface.createTable('terms', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      unique: true
    },
    startDate: Sequelize.DATE,
    endDate: Sequelize.DATE,
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
  });
}

export function down(queryInterface) {
  queryInterface.dropTable('terms');
}
