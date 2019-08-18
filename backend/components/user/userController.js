const bcrypt = require('bcrypt');
const saltRounds = 10;

const User = require('./userModel');
const userService = require('./userService');

module.exports = {
  async createUser(req, res) {
    try {
      const { username, firstname, lastname, password, email } = req.body;
      const newPerson = await userService.createUser(username, firstname, lastname, password, email);

      res.json({
        success: true,
        data: newperson
      });
    } catch (err) {
      res.json({
        success: false,
        data: err
      });
    }
  },

  async getUsers(req, res) {
    try {
      const result = await User.find(req.query);

      res.json(result)
    } catch (err) {
      res.json({
        success: false,
        data: err
      })
    }
  },

  async updateUser(req, res) {
    try {
      let query={};

      for(let index in req.body) {
        query[index] = req.body[index];
      }

      if(query.image){ //exists
        delete query.image;
      }

      if(req.file){ //exists
        query.image_path = req.file.filename;
      }

      const where = {
        id: req.user.id
      };

      const result = await userService.updateUser(where, query);

      res.json({
        success: true,
        data: result,
      })
    } catch (err) {
      res.json({
        success: false,
        data: err
      })
    }
  },
  //
  // async find(query) {
  //   // find multiple users
  //   try {
  //     const users = await findQuery(User)
  //       .allow(['id', 'firstname', 'lastname', 'email'])
  //       .build(query);
  //
  //       return users;
  //   } catch (err) {
  //     return {
  //       success: false,
  //       data: err
  //     };
  //   }
  // },
  //
  // async findByUserOrEmail(query) {
  //   try {
  //     const user = await User.query().where({username: query}).orWhere({email: query}).first();
  //     return user;
  //   } catch (err) {
  //     handleError(err);
  //     return {
  //       success: false,
  //       data: serializeError(err)
  //     };
  //   }
  // },
  //
  // async findOne(query) {
  //   try {
  //     const user = await User.query().findOne(query)
  //     return user;
  //   } catch (err) {
  //     handleError(err);
  //     return {
  //       success: false,
  //       data: serializeError(err)
  //     };
  //   }
  // },
  //
  // async comparePassword(pass, hash) {
  //   try {
  //     const result = await bcrypt.compare(pass, hash);
  //     return result;
  //   } catch (err) {
  //     handleError(err);
  //     return err;
  //   }
  // }
};
