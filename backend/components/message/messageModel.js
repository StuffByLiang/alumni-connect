const findQuery = require('objection-find');
const handleError = require( __base + 'helpers/handleError.js');
const BaseModel = require(__base + 'helpers/baseModel.js');

// var bcrypt = require("bcryptjs"); // for password hashing

/* CREATING OUR USER MODEL */
class Message extends BaseModel {
  static get tableName() {
    return 'messages'
  }

  static get idColumn() {
    return 'id';
  }

  static get jsonSchema () {
    return {
      type: 'object',

      properties: {
        id: {type: 'integer'},
        from_user_id: {type: 'integer'},
        to_user_id: {type: 'integer'},
        message: {type: 'string', minLength: 1, maxLength: 5000},
        timestamp: {type: 'timestamp'}
      }
    };
  }
}

module.exports = Message;
