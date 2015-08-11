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
    level: {
      type: Sequelize.INTEGER,
      defaultValue: 100
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
  });
}

export function down(queryInterface) {
  queryInterface.dropTable('permissions');
}
