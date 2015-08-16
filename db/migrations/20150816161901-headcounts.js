'use strict';

export function up(queryInterface, Sequelize) {
  return queryInterface.createTable('headcounts', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    count: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    userDce: {
      type: Sequelize.STRING,
      allowNull: false,
      references: { model: 'users', key: 'dce' },
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  });
}

export function down(queryInterface) {
  return queryInterface.dropTable('headcounts');
}
