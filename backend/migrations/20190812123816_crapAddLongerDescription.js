
exports.up = function(knex) {
  return knex.schema.table('users', table => {
    table.string('description', 1000).alter();
  })
};

exports.down = function(knex) {
  return knex.schema.table('users', table => {
    table.string('description').alter();
  })
};
