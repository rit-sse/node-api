export function up(queryInterface, Sequelize) {
  queryInterface.createTable('terms', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false
    },
    startDate: {
      type: Sequelize.DATE,
      allowNull: false
    },
    endDate: {
      type: Sequelize.DATE,
      allowNull: false
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
  });
}

export function down(queryInterface) {
  queryInterface.dropTable('terms');
}
