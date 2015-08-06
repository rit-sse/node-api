export function up(queryInterface, Sequelize) {
  queryInterface.createTable('permissions', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING,
      unique: true
    },
    description: Sequelize.STRING,
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
  })
}

export function down(queryInterface, Sequelize) {
  queryInterface.dropTable('permissions');
}
