export function up(queryInterface, Sequelize) {
  return queryInterface.changeColumn('quotes', 'body', {
    type: Sequelize.TEXT,
    allowNull: false,
    unique: true,
  })
  .then(() => queryInterface.changeColumn('quotes', 'description', {
    type: Sequelize.TEXT,
  }));
}

export function down(queryInterface, Sequelize) {
  return queryInterface.changeColumn('quotes', 'body', {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  })
  .then(() => queryInterface.changeColumn('quotes', 'description', {
    type: Sequelize.STRING,
  }));
}
