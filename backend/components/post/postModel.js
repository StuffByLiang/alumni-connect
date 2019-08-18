const { Model } = require('objection');

const findQuery = require('objection-find');

const Group = require(__base + 'components/group/groupModel.js');
const User = require(__base + 'components/user/UserModel.js');
const Comment = require(__base + 'components/comment/commentModel.js');

const handleError = require( __base + 'helpers/handleError.js');
const BaseModel = require(__base + 'helpers/baseModel.js');

class Post extends BaseModel {
  static get tableName() {
    return 'posts';
  }

  static get idColumn() {
    return 'id';
  }

  static get jsonSchema () {
    return {
      type: 'object',
      // required: ['username', 'password', 'firstname', 'lastname', 'email'],

      properties: {
        id: {type: 'integer'},
        user_id: {type: 'integer'},
        group_id: {type: 'integer'},
        post: {type: 'string'},
        timestamp: {type: 'timestamp'},
      }
    };
  }

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'posts.user_id',
          to: 'users.id'
        }
      },

      group: {
        relation:  Model.BelongsToOneRelation,
        modelClass: Group,
        join: {
          from: 'posts.group_id',
          to: 'groups.id'
        }
      },

      comments: {
        relation:  Model.HasManyRelation,
        modelClass: Comment,
        join: {
          from: 'posts.id',
          to: 'comments.post_id'
        }
      },
    };
  }

  static async findOne(query) {
    try {
      return await this
        .query()
        .eager('[user, group, comments]')
        .modifyEager('user', builder => {
          builder.select('id', 'firstname', 'lastname', 'username', 'image_path', 'company', 'position');
        })
        .modifyEager('comments', builder => {
          builder.orderBy('timestamp');;
        })
        .findOne(query)
    } catch (err) {
      throw handleError(err);
    }
  }

  static async find(query) {
    try {
      return await this
        .query()
        .eager('[user, group, comments.[user]]')
        .modifyEager('user', builder => {
          builder.select('id', 'firstname', 'lastname', 'username', 'image_path', 'company', 'position');
        })
        .modifyEager('comments', builder => {
          builder.orderBy('timestamp');;
        })
        .modifyEager('comments.[user]', builder => {
          builder.select('id', 'firstname', 'lastname', 'username', 'image_path', 'company', 'position');
        })
        .where(query)
        .orderBy('timestamp', 'desc');
    } catch (err) {
      throw handleError(err);
    }
  }
}

module.exports = Post;
