const Comment = require('./commentModel');

module.exports = {
  async create(req, res) {
    try {
      let query = {
        user_id: req.user.id,
        post_id: req.body.post_id,
        replyTo_comment_id: req.body.replyTo_comment_id ? parseInt(req.body.replyTo_comment_id) : null,
        comment: req.body.comment
      }

      console.log(query);
      const data = await Comment.create(query);

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
      const result = await Comment.find(req.query);

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

      const result = await Comment.update(where, query);

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

  async delete(req, res) {
    try {
      let { comment_id } = req.body;

      const comment = await Comment.findOne({
        id: comment_id
      });

      if(req.user.id !== comment.user_id) {
        throw 'User does not own the comment';
      }

      await Comment.delete({
        replyTo_comment_id: comment_id
      }); // delete replies
      const result = await Comment.delete({
        id: comment_id
      });

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
