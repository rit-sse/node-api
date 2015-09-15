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
  })
    .then(() => {
      queryInterface.addIndex(
        'mentors',
        ['userDce', 'termName'],
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
