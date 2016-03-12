export function up(queryInterface, Sequelize) {
  return queryInterface.createTable('quotes', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    body: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: Sequelize.STRING,
    },
    approved: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  });
}

export function down(queryInterface) {
  return queryInterface.dropTable('quotes');
}
