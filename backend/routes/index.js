var express = require('express');
var router = express.Router();

router.use('/user', require('../components/user/userRoutes'));
router.use('/group', require('../components/group/groupRoutes'));
router.use('/post', require('../components/post/postRoutes'));
router.use('/comment', require('../components/comment/commentRoutes'));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json('lol');
});

router.post('/debug', function(req, res, next) {
  console.log(req.body);
  console.log(req.body.username, req.body.password)
  res.json(req.body);
});

module.exports = router;
