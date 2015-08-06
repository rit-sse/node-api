export var up = function(knex, Promise) {
  return knex.schema.createTable('users', function (table) {
    table.increments();
    table.string('firstName');
    table.string('lastName');
    table.string('dce').unique();
    table.timestamp('createdAt')
    table.timestamp('updatedAt');
  });
};

export var down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
