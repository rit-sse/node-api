export function up(queryInterface, Sequelize) {
  queryInterface.createTable('lingo', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    phrase: Sequelize.STRING,
    definition: Sequelize.STRING,
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
  });
}

export function down(queryInterface) {
  queryInterface.dropTable('lingo');
}
