'use strict';

export function up(queryInterface, Sequelize) {
  return queryInterface.createTable('officers', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    primary: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    committeeId: {
      type: Sequelize.INTEGER,
      references: { model: 'committees', key: 'id' },
    },
    termName: {
      type: Sequelize.STRING,
      allowNull: false,
      references: { model: 'terms', key: 'name' },
    },
    userDce: {
      type: Sequelize.STRING,
      allowNull: false,
      references: { model: 'users', key: 'dce' },
    },
    endDate: Sequelize.DATE,
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  });
}

export function down(queryInterface) {
  return queryInterface.dropTable('officers');
}
