export function up(queryInterface, Sequelize) {
  queryInterface.createTable('mentoringShifts', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    mentorId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: 'mentor', key: 'id' }
    },
    startTime: Sequelize.TIME,
    endTime: Sequelize.TIME,
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
  });
}

export function down(queryInterface) {
  queryInterface.dropTable('mentoringShifts');
}
