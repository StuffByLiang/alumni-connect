
exports.up = function(knex) {
  return knex.schema.table('users', table => {
    table.integer('age', 3);
    table.string('province', 30);
    table.string('school', 256);
    table.string('location', 256);
    table.string('phone', 12);
    table.string('website', 64);
    table.string('description');
    table.string('company', 64);
    table.string('position', 64);
    table.string('industry', 32);
    table.string('facebook', 256);
    table.string('instagram', 32);
    table.string('snapchat', 32);
    table.string('image_path', 256);
  })
};

exports.down = function(knex) {
  return knex.schema.table('users', table => {
    table.dropColumn('age');
    table.dropColumn('province');
    table.dropColumn('school');
    table.dropColumn('location');
    table.dropColumn('phone');
    table.dropColumn('website');
    table.dropColumn('description');
    table.dropColumn('company');
    table.dropColumn('position');
    table.dropColumn('industry');
    table.dropColumn('facebook');
    table.dropColumn('instagram');
    table.dropColumn('snapchat');
    table.dropColumn('image_path');
  })
};
