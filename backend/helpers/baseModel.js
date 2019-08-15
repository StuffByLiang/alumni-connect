const { Model } = require('objection');
const findQuery = require('objection-find');
const handleError = require( __base + 'components/errors/handle.js');


class BaseModel extends Model {
  static async update(where, query) {
    // Use Case:
    // User.update({ id: 1 }, {element: value})
    try {
      console.log(query)

      const result = await this.query().update(query).where(where);
      return result;
    } catch (err) {
      throw handleError(err);
    }
  }

  static async findOne(query) {
    try {
      const user = await this.query().findOne(query)
      return user;
    } catch (err) {
      throw handleError(err);
    }
  }

  static async find(query) {
    try {
      const users = await findQuery(this)
        // .allow(['id', 'firstname', 'lastname', 'email'])
        .build(query);
      return users;
    } catch (err) {
      throw handleError(err);
    }
  }
}

module.exports = BaseModel;
