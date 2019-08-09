const { Model } = require('objection');

// var bcrypt = require("bcryptjs"); // for password hashing

/* CREATING OUR USER MODEL */
class User extends Model {
  static get tableName() {
    return 'users'
  }

  static get idColumn() {
    return 'id';
  }

  static get jsonSchema () {
    return {
      type: 'object',
      required: ['username', 'password', 'firstname', 'lastname', 'email'],

      properties: {
        id: {type: 'integer'},
        username: {type: 'string', minLength: 1, maxLength: 16},
        password: {type: 'string', minLength: 1, maxLength: 60},
        firstname: {type: 'string', minLength: 1, maxLength: 12},
        lastname: {type: 'string', minLength: 1, maxLength: 12},
        email: {type: 'string', minLength: 1, maxLength: 25},
      }
    };
  }
}

module.exports = User;
