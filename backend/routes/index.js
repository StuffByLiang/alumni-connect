var express = require('express');
var router = express.Router();

router.use('/user', require('../components/user/userRoutes'));

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
