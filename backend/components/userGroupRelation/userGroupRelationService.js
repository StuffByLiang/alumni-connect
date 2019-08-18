const findQuery = require('objection-find');

const User = require('./userModel');

const handleError = require( __base + 'helpers/handleError.js');

module.exports = {
  async createUser(username, firstname, lastname, password, email) {
    try {
      const newPerson = await User.create(username, firstname, lastname, password, email);
      return newPerson;
    } catch (err) {
      throw err;
    }
  },
  async updateUser(where, query) {
    try {
      const result = await User.update(where, query);
      return result;
    } catch (err) {
      throw err;
    }
  },
  async uploadProfilePicture() {
    
  }


}
