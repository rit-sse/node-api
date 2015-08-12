export function up(queryInterface, Sequelize) {
  queryInterface.createTable('officers', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    display: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    committeeId: {
      type: Sequelize.INTEGER,
      references: { model: 'users', key: 'id' }
    },
    primary: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
  });
}

export function down(queryInterface) {
  queryInterface.dropTable('officers');
}
