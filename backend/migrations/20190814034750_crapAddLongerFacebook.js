
exports.up = function(knex) {
  return knex.schema.table('users', table => {
    table.string('facebook', 256).alter();
  })
};

exports.down = function(knex) {
  return knex.schema.table('users', table => {
    table.string('facebook', 32).alter();
  })
};
