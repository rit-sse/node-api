'use strict';

export function up(queryInterface, Sequelize) {
  return queryInterface.createTable('users', {
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING,
    dce: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  });
}

export function down(queryInterface) {
  return queryInterface.dropTable('users');
}
