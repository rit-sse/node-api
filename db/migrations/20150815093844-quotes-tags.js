'use strict';

export function up(queryInterface, Sequelize) {
  return queryInterface.createTable('quotes_tags', {
    tagId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: 'tags', key: 'id' },
      primaryKey: true,
    },
    quoteId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: 'quotes', key: 'id' },
      primaryKey: true,
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  });
}

export function down(queryInterface) {
  return queryInterface.dropTable('quotes_tags');
}
