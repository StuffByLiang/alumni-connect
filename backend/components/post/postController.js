const Post = require('./postModel');

module.exports = {
  async create(req, res) {
    try {
      let query = {
        user_id: req.user.id,
        group_id: parseInt(req.body.groupId),
        post: req.body.post
      }
      const data = await Post.create(query);

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
      const result = await Post.find(req.query);

      res.json({
        success: true,
        posts: result
      })
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

      const result = await Post.update(where, query);

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
