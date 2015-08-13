export function up(queryInterface, Sequelize) {
  return queryInterface.createTable('lingo', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    phrase: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false
    },
    definition: {
      type: Sequelize.STRING,
      allowNull: false
    },
    approved: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
  });
}

export function down(queryInterface) {
  return queryInterface.dropTable('lingo');
}
