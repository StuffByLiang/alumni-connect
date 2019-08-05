var express = require('express');
var router = express.Router();

const User = require( __base + '/components/auth/userController.js');

/* /user route */
router.post('/', async function(req, res, next) {
  const { username, firstname, lastname, password, email } = req.body;

  try {
    const result = await User.create(username, firstname, lastname, password, email);
    res.json(result);
  } catch (err) {
    res.json(err);
  }
});

router.get('/', async function(req, res, next) {
  try {
    const result = await User.find(req.query);
    res.json(result);
  } catch (err) {
    res.json(err);
  }
})

module.exports = router;
