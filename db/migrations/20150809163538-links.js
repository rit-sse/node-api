'use strict';

export function up(queryInterface, Sequelize) {
  return queryInterface.createTable('links', {
    shortLink: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
    },
    longLink: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  });
}

export function down(queryInterface) {
  return queryInterface.dropTable('links');
}
