const bcrypt = require('bcrypt');
const saltRounds = 10;

const { Model } = require('objection');

const findQuery = require('objection-find');

const handleError = require( __base + 'components/errors/handle.js');

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

  /* custom functions to retrieve data */

  static async create(username, firstname, lastname, password, email) {
    try {
      const hashedPass = await bcrypt.hash(password, saltRounds);
      const newPerson = await this
        .query()
        .insert({ username: username, firstname: firstname, lastname: lastname, password: hashedPass, email: email });
      return newPerson;
    } catch (err) {
      throw handleError(err);
    }
  }

  static async find(query) {
    // find multiple users
    try {
      const users = await findQuery(this)
        .allow(['id', 'firstname', 'lastname', 'email'])
        .build(query);
      return users;
    } catch (err) {
      throw handleError(err);
    }
  }

  static async findByUserOrEmail(query) {
    try {
      const user = await this.query().where({username: query}).orWhere({email: query}).first();
      return user;
    } catch (err) {
      throw handleError(err);
    }
  }

  static async findOne(query) {
    try {
      const user = await User.query().findOne(query)
      return user;
    } catch (err) {
      throw handleError(err);
    }
  }

  static async comparePassword(pass, hash) {
    try {
      const result = await bcrypt.compare(pass, hash);
      return result;
    } catch (err) {
      throw handleError(err);
    }
  }

}

module.exports = User;
