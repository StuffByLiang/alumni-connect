const { Model } = require('objection');

const findQuery = require('objection-find');

const handleError = require( __base + 'helpers/handleError.js');
const BaseModel = require(__base + 'helpers/baseModel.js');

class UserGroupRelation extends BaseModel {
  static get tableName() {
    return 'user_group_relations';
  }

  static get idColumn() {
    return ['user_id', 'group_id'];
  }

  static get jsonSchema () {
    return {
      type: 'object',

      properties: {
        user_id: {type: 'integer'},
        group_id: {type: 'integer'},
      }
    };
  }

}

module.exports = UserGroupRelation;
