export function up(queryInterface, Sequelize) {
  return queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
    .then(() => queryInterface.addColumn('events', 'uuid', {
      type: Sequelize.UUID,
      defaultValue: Sequelize.literal('uuid_generate_v4()'),
      allowNull: false,
      unique: true,
    }));
}

export function down(queryInterface) {
  return queryInterface.removeColumn('events', 'uuid');
}
