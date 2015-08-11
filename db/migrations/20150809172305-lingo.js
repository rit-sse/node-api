export function up(queryInterface, Sequelize) {
  queryInterface.createTable('lingo', {
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
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
  });
}

export function down(queryInterface) {
  queryInterface.dropTable('lingo');
}
