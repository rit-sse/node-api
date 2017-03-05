export function up(queryInterface) {
  return queryInterface.dropTable('tips')
    .then(() => queryInterface.dropTable('lingo'))
    .then(() => queryInterface.dropTable('agendaItems'));
}

export function down(queryInterface, Sequelize) {
  return queryInterface.createTable('tips', {
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
    userDce: {
      type: Sequelize.STRING,
      allowNull: false,
      references: { model: 'users', key: 'dce' },
    },
    approved: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  })
    .then(() => queryInterface.createTable('lingo', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      phrase: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      definition: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      approved: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    }))
    .then(() => queryInterface.createTable('agendaItems', {
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
    }));
}
