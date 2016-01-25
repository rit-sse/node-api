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
    primaryOfficer: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    committeeName: {
      type: Sequelize.STRING,
      references: { model: 'committees', key: 'name' },
    },
    userDce: {
      type: Sequelize.STRING,
      allowNull: false,
      references: { model: 'users', key: 'dce' },
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
  return queryInterface.dropTable('officers');
}
