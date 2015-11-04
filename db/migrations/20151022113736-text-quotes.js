'use strict';

export function up(queryInterface, Sequelize) {
  return queryInterface.changeColumn('quotes', 'body', {
    type: Sequelize.TEXT,
    allowNull: false,
    unique: true,
  })
  .then( () => {
    return queryInterface.changeColumn('quotes', 'description', {
      type: Sequelize.TEXT,
    });
  });
}

export function down(queryInterface) {
  return queryInterface.changeColumn('quotes', 'body', {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  })
  .then( () => {
    return queryInterface.changeColumn('quotes', 'description', {
      type: Sequelize.STRING,
    });
  });
}
