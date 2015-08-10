export function up(queryInterface, Sequelize) {
  queryInterface.createTable('tips', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    body: Sequelize.STRING,
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' }
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
  });
}

export function down(queryInterface) {
  queryInterface.dropTable('tips');
}
