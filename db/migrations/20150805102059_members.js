exports.up = function(knex, Promise) {
  knex.schema.createTable('members', function (table) {
    table.increments();
    table.string('firstName');
    table.string('lastName');
    table.string('dce').unique();
    table.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('members');
};
