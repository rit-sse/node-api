export function up(queryInterface, Sequelize) {
  return queryInterface.createTable('officers', {
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
    primary: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    committeeId: {
      type: Sequelize.INTEGER,
      references: { model: 'users', key: 'id' }
    },
    termId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: 'terms', key: 'id' }
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' }
    },
    endDate: Sequelize.DATE,
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
  });
}

export function down(queryInterface) {
  return queryInterface.dropTable('officers');
}
