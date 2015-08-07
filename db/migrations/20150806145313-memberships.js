export function up(queryInterface, Sequelize) {
  queryInterface.createTable('memberships', {
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
    groupId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: 'groups', key: 'id' }
    },
    termId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: 'terms', key: 'id' }
    },
    reason: Sequelize.STRING,
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
  });
}

export function down(queryInterface, Sequelize) {
  queryInterface.dropTable('memberships');
}
