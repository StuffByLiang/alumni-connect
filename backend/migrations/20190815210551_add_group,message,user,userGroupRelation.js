exports.up = async function(knex) {
  let createGroupTable = async () => {
    if(await knex.schema.hasTable('groups')) return Promise.resolve();
    return knex.schema.createTable('groups', table => {
      table.increments('id').primary().unsigned();
      table.string('university', 128);
      table.integer('year', 5);
    });
  }
  let createUserGroupRelationTable = async () =>{
    if(await knex.schema.hasTable('user_group_relations')) return Promise.resolve();
    knex.schema.createTable('user_group_relations', table => {
      table.integer('user_id').unsigned();
      table.integer('group_id').unsigned();
      table.primary(['user_id', 'group_id']);
    });
  }
  let createMessageTable = async () =>{
    if(await knex.schema.hasTable('messages')) return Promise.resolve();
    knex.schema.createTable('messages', table => {
      table.increments('id').primary().unsigned();
      table.integer('from_user_id').unsigned();
      table.integer('to_user_id').unsigned();
      table.foreign('from_user_id').references('users.id');
      table.foreign('to_user_id').references('users.id');
      table.string('message', 5000);
      table.timestamp('timestamp').defaultTo(knex.fn.now());
    });
  }
  let createPostTable = async () =>{
    if(await knex.schema.hasTable('posts')) return Promise.resolve();
    knex.schema.createTable('posts', table => {
      table.increments('id').primary().unsigned();
      table.integer('user_id').unsigned();
      table.integer('group_id').unsigned();
      table.foreign('user_id').references('users.id');
      table.foreign('group_id').references('groups.id');
      table.text('post', 'text');
      table.timestamp('timestamp').defaultTo(knex.fn.now());
    });
  }
  let createCommentTable = async () =>{
    if(await knex.schema.hasTable('comments')) return Promise.resolve();
    knex.schema.createTable('comments', table => {
      table.increments('id').primary().unsigned();
      table.integer('user_id').unsigned();
      table.integer('post_id').unsigned();
      table.integer('replyTo_comment_id').unsigned();
      table.foreign('user_id').references('users.id');
      table.foreign('post_id').references('posts.id');
      table.foreign('replyTo_comment_id').references('comments.id');
      table.string('comment', 2000);
      table.timestamp('timestamp').defaultTo(knex.fn.now());
    });
  }

  return createGroupTable()
    .then(createUserGroupRelationTable)
    .then(createMessageTable)
    .then(createPostTable)
    .then(createCommentTable)
};

exports.down = function(knex) {
  let dropGroupTable = () =>knex.schema.dropTableIfExists('groups');
  let dropUserGroupRelationTable = () =>knex.schema.dropTableIfExists('user_group_relations');
  let dropMessageTable = () =>knex.schema.dropTableIfExists('messages');
  let dropPostTable = () =>knex.schema.dropTableIfExists('posts');
  let dropCommentTable = () =>knex.schema.dropTableIfExists('comments');

  return dropGroupTable()
    .then(dropUserGroupRelationTable)
    .then(dropMessageTable)
    .then(dropPostTable)
    .then(dropCommentTable)
};
