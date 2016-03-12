export function up(queryInterface, Sequelize) {
  return queryInterface.createTable('quotes_tags', {
    tagName: {
      type: Sequelize.STRING,
      allowNull: false,
      references: { model: 'tags', key: 'name' },
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
