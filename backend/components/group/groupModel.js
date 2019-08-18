const { Model } = require('objection');

const handleError = require( __base + 'helpers/handleError.js');
const BaseModel = require(__base + 'helpers/baseModel.js');

class Group extends BaseModel {
  static get tableName() {
    return 'groups';
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
        university: {type: 'string', minLength: 1, maxLength: 128},
        year: {type: 'integer'},
      }
    };
  }

  static async find(query) {
    try {
      let groups;
      if(query.university !== 'all') {
        groups = await this
          .query()
          .where(query)
          .whereNot('university', 'all');
      } else {
        groups = await this
          .query()
          .where(query)
      }
      return groups;
    } catch (err) {
      throw handleError(err);
    }
  }
}

module.exports = Group;
