export function up(queryInterface, Sequelize) {
  return queryInterface.createTable('announcements', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    announcement: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    announcementType: Sequelize.STRING,
    active: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  });
}

export function down(queryInterface) {
  return queryInterface.dropTable('announcements');
}
