export function up(queryInterface, Sequelize) {
  return queryInterface.createTable('agendaItems', {
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
    week: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    userDce: {
      type: Sequelize.STRING,
      allowNull: false,
      references: { model: 'users', key: 'dce' },
    },
    officerId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: 'officers', key: 'id' },
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  });
}

export function down(queryInterface) {
  return queryInterface.dropTable('agendaItems');
}
