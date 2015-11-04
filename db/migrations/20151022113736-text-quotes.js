'use strict';

export function up(queryInterface, Sequelize) {
  return Promise.all([
    queryInterface.changeColumn('quotes', 'body', {
      type: Sequelize.TEXT,
      allowNull: false,
      unique: true,
    }),
    queryInterface.changeColumn('quotes', 'description', {
      type: Sequelize.TEXT,
    }),
  ]);
}

export function down(queryInterface) {
  return Promise.all([
    queryInterface.changeColumn('quotes', 'body', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    }),
    queryInterface.changeColumn('quotes', 'description', {
      type: Sequelize.STRING,
    }),
  ]);
}
