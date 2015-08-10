export function up(queryInterface, Sequelize) {
  queryInterface.createTable('links', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    shortLink: Sequelize.STRING,
    longLink: Sequelize.STRING,
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
  });
}

export function down(queryInterface) {
  queryInterface.dropTable('links');
}
