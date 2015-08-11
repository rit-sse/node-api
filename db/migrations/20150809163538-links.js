export function up(queryInterface, Sequelize) {
  queryInterface.createTable('links', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    shortLink: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    longLink: {
      type: Sequelize.STRING,
      allowNull: false
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
  });
}

export function down(queryInterface) {
  queryInterface.dropTable('links');
}
