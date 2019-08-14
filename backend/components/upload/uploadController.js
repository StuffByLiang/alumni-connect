const uploadService = require('./uploadService');

module.exports = {
  async uploadProfilePicture(req, res) {
    try {
      const { username, firstname, lastname, password, email } = req.body;
      const newPerson = userService.createUser(username, firstname, lastname, password, email);

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
  }
};
