'use strict';

export function up(queryInterface, Sequelize) {
  return queryInterface.createTable('events', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
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
    description: Sequelize.TEXT,
    location: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    image: Sequelize.STRING,
    committeeId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: 'committees', key: 'id' },
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  });
}

export function down(queryInterface) {
  return queryInterface.dropTable('events');
}
