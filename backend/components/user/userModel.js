const bcrypt = require('bcrypt');
const saltRounds = 10;

const findQuery = require('objection-find');
const handleError = require( __base + 'helpers/handleError.js');
const BaseModel = require(__base + 'helpers/baseModel.js');

// var bcrypt = require("bcryptjs"); // for password hashing

/* CREATING OUR USER MODEL */
class User extends BaseModel {
  static get tableName() {
    return 'users'
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
        username: {type: 'string', minLength: 1, maxLength: 16},
        password: {type: 'string', minLength: 1, maxLength: 60},
        firstname: {type: 'string', minLength: 1, maxLength: 12},
        lastname: {type: 'string', minLength: 1, maxLength: 12},
        email: {type: 'string', minLength: 1, maxLength: 25},
        location: {type: 'string', minLength: 1, maxLength: 120},
        age: {type: 'integer'},
        province: {type: 'string', minLength: 1, maxLength: 30},
        school: {type: 'string', minLength: 1, maxLength: 256},
        location: {type: 'string', minLength: 1, maxLength: 256},
        phone: {type: 'string', minLength: 1, maxLength: 12},
        website: {type: 'string', minLength: 1, maxLength: 64},
        description: {type: 'string', minLength: 1, maxLength: 1000},
        company: {type: 'string', minLength: 1, maxLength: 64},
        position: {type: 'string', minLength: 1, maxLength: 64},
        industry: {type: 'string', minLength: 1, maxLength: 64},
        facebook: {type: 'string', minLength: 1, maxLength: 256},
        instagram: {type: 'string', minLength: 1, maxLength: 32},
        snapchat: {type: 'string', minLength: 1, maxLength: 32},
        image_path: {type: 'string', minLength: 1, maxLength: 256},
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

  static async findByUserOrEmail(query) {
    try {
      const user = await this.query().where({username: query}).orWhere({email: query}).first();
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
