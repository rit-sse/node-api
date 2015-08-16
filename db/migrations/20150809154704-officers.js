'use strict';

export function up(queryInterface, Sequelize) {
  return queryInterface.createTable('officers', {
    title: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    primary: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    committeeId: {
      type: Sequelize.INTEGER,
      references: { model: 'users', key: 'id' },
    },
    termName: {
      type: Sequelize.STRING,
      allowNull: false,
      references: { model: 'terms', key: 'name' },
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' },
    },
    endDate: Sequelize.DATE,
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  });
}

export function down(queryInterface) {
  return queryInterface.dropTable('officers');
}
