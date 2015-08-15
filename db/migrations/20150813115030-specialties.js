'use strict';

export function up(queryInterface, Sequelize) {
  return queryInterface.createTable('specialties', {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  });
}

export function down(queryInterface) {
  return queryInterface.dropTable('specialties');
}
