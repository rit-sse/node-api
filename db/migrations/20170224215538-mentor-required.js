export function up(queryInterface, Sequelize) {
  return queryInterface.changeColumn('mentors', 'endDate', {
    type: Sequelize.DATE,
    allowNull: true,
  })
    .then(() => queryInterface.changeColumn('mentors', 'bio', {
      type: Sequelize.TEXT,
      allowNull: true,
    }));
}

export function down(queryInterface, Sequelize) {
  return queryInterface.changeColumn('mentors', 'endDate', {
    type: Sequelize.DATE,
    allowNull: false,
  })
    .then(() =>  queryInterface.changeColumn('mentors', 'bio', {
      type: Sequelize.TEXT,
      allowNull: false,
    }));
}
