const Group = require('./groupModel');

module.exports = {
  async create(req, res) {
    try {
      req.body.year = parseInt(req.body.year);
      const data = await Group.create(req.body);

      res.json({
        success: true,
        data
      });
    } catch (err) {
      res.json({
        success: false,
        data: err
      });
    }
  },

  async get(req, res) {
    try {
      const result = await Group.find(req.query);

      res.json(result)
    } catch (err) {
      res.json({
        success: false,
        data: err
      })
    }
  },

  async update(req, res) {
    try {
      let query=req.body;
      const where = {
        id: req.params.id
      };

      const result = await Group.update(where, query);

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
};
