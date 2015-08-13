export function up(queryInterface, Sequelize) {
  queryInterface.createTable('mentors', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' }
    },
    termId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: 'terms', key: 'id' }
    },
    endDate: Sequelize.DATE,
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
  });
}

export function down(queryInterface) {
  queryInterface.dropTable('mentors');
}
