'use strict';

export function up(queryInterface, Sequelize) {
  return queryInterface.createTable('memberships', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userDce: {
      type: Sequelize.STRING,
      allowNull: false,
      references: { model: 'users', key: 'dce' },
    },
    committeeId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: 'committees', key: 'id' },
    },
    startDate: {
      type: Sequelize.startDate,
      allowNull: false,
    },
    endDate: {
      type: Sequelize.startDate,
      allowNull: false,
    },
    reason: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    approved: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  });
}

export function down(queryInterface) {
  return queryInterface.dropTable('memberships');
}
