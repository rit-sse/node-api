'use strict';

export function up(queryInterface, Sequelize) {
  return queryInterface.createTable('terms', {
    name: {
      type: Sequelize.STRING,
      primaryKey: true,
      allowNull: false,
    },
    startDate: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    endDate: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  });
}

export function down(queryInterface) {
  return queryInterface.dropTable('terms');
}
