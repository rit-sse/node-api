export var up = function(knex, Promise) {
  return knex.schema.createTable('members', function (table) {
    table.increments();
    table.string('firstName');
    table.string('lastName');
    table.string('dce').unique();
    table.timestamps();
  });
};

export var down = function(knex, Promise) {
  return knex.schema.dropTable('members');
};
