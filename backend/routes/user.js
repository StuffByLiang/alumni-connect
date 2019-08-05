var express = require('express');
var router = express.Router();
var passport = require('passport');

const User = require( __base + '/components/auth/userController.js');

/* /user route */
router.post('/', async function(req, res) {
  const { username, firstname, lastname, password, email } = req.body;
  const result = User.create(username, firstname, lastname, password, email);
  res.json(result);
});

router.get('/', async function(req, res) {
  const result = await User.find(req.query);
  res.json(result);
})

// Endpoint to login
router.post('/login',
  passport.authenticate('local'),
  function(req, res) {
    res.json(req.user);
  }
);

// Endpoint to get current user
router.get('/get', function(req, res){
  res.json(req.user);
})


router.get('/logout', function(req, res) {
  req.logout();
  res.json(null);
})

module.exports = router;
