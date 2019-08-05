const bcrypt = require('bcrypt');
const findQuery = require('objection-find');
const saltRounds = 10;

const User = require( __base + 'models/User');

const serializeError = require('serialize-error');
const handleError = require( __base + 'components/errors/handle.js');

module.exports = {
  async create(username, firstname, lastname, password, email) {
    try {
      const hashedPass = await bcrypt.hash(password, saltRounds);
      const newPerson = await User
        .query()
        .insert({ username: username, firstname: firstname, lastname: lastname, password: hashedPass, email: email });

        return {
          result: "success",
          data: newperson
        };
    } catch (err) {
      handleError(err);
      err.message = JSON.stringify(err, Object.getOwnPropertyNames(err));
      return {
        result: "error",
        data: serializeError(err)
      };
    }
  },

  async find(query) {
    // find multiple users
    try {
      const users = await findQuery(User)
        .allow(['id', 'firstname', 'lastname', 'email'])
        .build(query);

        return users;
    } catch (err) {
      handleError(err);
      return {
        result: "error",
        data: serializeError(err)
      };
    }
  },

  async findOne(query) {
    try {
      const user = await User.query().findOne(query)
      return user;
    } catch (err) {
      handleError(err);
      return {
        result: "error",
        data: serializeError(err)
      };
    }
  },

  async comparePassword(pass, hash) {
    try {
      const result = await bcrypt.compare(pass, hash);
      return result;
    } catch (err) {
      handleError(err);
      return err;
    }
  }
};
