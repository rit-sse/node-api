export function up(queryInterface, Sequelize) {
  return queryInterface.createTable('shifts', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    mentorId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: 'mentors', key: 'id' }
    },
    day: Sequelize.STRING,
    startTime: Sequelize.TIME,
    endTime: Sequelize.TIME,
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
  });
}

export function down(queryInterface) {
  queryInterface.dropTable('shifts');
}
