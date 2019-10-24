const { Model } = require('objection');
const handleError = require( __base + 'helpers/handleError.js');


class BaseModel extends Model {
  static async create(query) {
    try {
    return await this
      .query()
      .insert(query);
    } catch (err) {
      throw handleError(err);
    }
  }

  static async update(where, query) {
    // Use Case:
    // User.update({ id: 1 }, {element: value})
    try {
      const result = await this.query().update(query).where(where);
      return result;
    } catch (err) {
      throw handleError(err);
    }
  }

  static async findOne(query) {
    try {
      const result= await this.query().findOne(query)
      return result;
    } catch (err) {
      throw handleError(err);
    }
  }

  static async find(query) {
    try {
      const result = await this
        .query()
        .where(query);
      return result;
    } catch (err) {
      throw handleError(err);
    }
  }

  static async delete(query) {
    try {
      const result = await this
        .query()
        .delete()
        .where(query);
      return result;
    } catch (err) {
      throw handleError(err);
    }
  }
}

module.exports = BaseModel;
