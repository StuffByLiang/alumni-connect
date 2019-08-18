const { Model } = require('objection');

const User = require(__base + 'components/user/userModel.js')

const handleError = require( __base + 'helpers/handleError.js');
const BaseModel = require(__base + 'helpers/baseModel.js');

class Comment extends BaseModel {
  static get tableName() {
    return 'comments'
  }

  static get idColumn() {
    return 'id';
  }

  static get jsonSchema () {
    return {
      type: 'object',

      properties: {
        id: {type: 'integer'},
        user_id: {type: 'integer'},
        post_id: {type: 'integer'},
        replyTo_comment_id: {type: ['integer', 'null']},
        comment: {type: 'string', minLength: 1, maxLength: 2000},
        timestamp: {type: 'timestamp'}
      }
    };
  }

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'comments.user_id',
          to: 'users.id'
        }
      },
    }
  }
}

module.exports = Comment;
