export function up(queryInterface, Sequelize) {
  queryInterface.createTable('groups_permissions', {
    permissionId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: 'permissions', key: 'id' },
      primaryKey: true
    },
    groupId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: 'groups', key: 'id' },
      primaryKey: true
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
  });
}

export function down(queryInterface, Sequelize) {
  queryInterface.dropTable('groups_permissions');
}
