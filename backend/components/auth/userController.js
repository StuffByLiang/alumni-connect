const bcrypt = require('bcrypt');
const findQuery = require('objection-find');
const saltRounds = 10;

const User = require( __base + 'models/User');

const serializeError = require('serialize-error');
const handleError = require( __base + 'components/errors/handle.js');

module.exports = {
  create(username, firstname, lastname, password, email) {
    return new Promise(async (resolve, reject) => {
      // create a fucking user
      try {
        const hashedPass = await bcrypt.hash(password, saltRounds);
        const newPerson = await User
          .query()
          .insert({ username: username, firstname: firstname, lastname: lastname, password: hashedPass, email: email });

          resolve({
            result: "success",
            data: newPerson
          });
      } catch (err) {
        handleError(err);
        err.message = JSON.stringify(err, Object.getOwnPropertyNames(err));
        reject({
          result: "error",
          data: serializeError(err)
        });
      }
    })
  },

  find(query) {
    return new Promise(async (resolve, reject) => {
      // create a fucking user
      try {
        const users = await findQuery(User)
          .allow(['id', 'firstname', 'lastname', 'email'])
          .build(query);

          resolve({
            result: "success",
            data: users
          });
      } catch (err) {
        handleError(err);
        reject({
          result: "error",
          data: serializeError(err)
        });
      }
    })
  }
};
