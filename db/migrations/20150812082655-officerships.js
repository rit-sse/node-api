export function up(queryInterface, Sequelize) {
  queryInterface.createTable('officerships', {
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' },
      primaryKey: true
    },
    officerId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: 'officers', key: 'id' },
      primaryKey: true
    },
    termId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: 'terms', key: 'id' },
      primaryKey: true
    },
    endDate: Sequelize.DATE,
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
  });
}

export function down(queryInterface) {
  queryInterface.dropTable('officerships');
}
