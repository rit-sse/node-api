'use strict';

export function up(queryInterface, Sequelize) {
  return queryInterface.changeColumn('officers', 'endDate', {
    type: Sequelize.DATE,
    allowNull: true,
  })
  .then( () => queryInterface.renameColumn('officers', 'primary', 'primaryOfficer'));
}

export function down(queryInterface, Sequelize) {
  return queryInterface.changeColumn('officers', 'endDate', {
    type: Sequelize.DATE,
    allowNull: false,
  });
}
