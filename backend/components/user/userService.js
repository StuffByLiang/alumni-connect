const findQuery = require('objection-find');

const User = require('./userModel');

const handleError = require( __base + 'components/errors/handle.js');

module.exports = {
  createUser(username, firstname, lastname, password, email) {
    try {
      User.create(username, firstname, lastname, password, email);
      return newPerson;
    } catch (err) {
      throw err;
    }
  },



}
