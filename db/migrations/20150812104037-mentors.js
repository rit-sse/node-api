'use strict';

export function up(queryInterface, Sequelize) {
  return queryInterface.createTable('mentors', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    bio: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' },
    },
    termName: {
      type: Sequelize.STRING,
      allowNull: false,
      references: { model: 'terms', key: 'name' },
    },
    endDate: Sequelize.DATE,
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  })
    .then(() => {
      queryInterface.addIndex(
        'mentors',
        ['userId', 'termName'],
        {
          indexName: 'mentorsUserTermIndex',
          indicesType: 'UNIQUE',
        }
      );
    });
}

export function down(queryInterface) {
  return queryInterface.dropTable('mentors');
}
