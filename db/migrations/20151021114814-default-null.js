'use strict';

export function up(queryInterface, Sequelize) {
  return Promise.all([
    queryInterface.changeColumn('memberships', 'approved', {
      type: Sequelize.BOOLEAN,
      defaultValue: null,
    }),
    queryInterface.changeColumn('quotes', 'approved', {
      type: Sequelize.BOOLEAN,
      defaultValue: null,
    }),
  ]);
}

export function down(queryInterface) {
  return Promise.all([
    queryInterface.changeColumn('memberships', 'approved', {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    }),
    queryInterface.changeColumn('quotes', 'approved', {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    }),
  ]);
}
