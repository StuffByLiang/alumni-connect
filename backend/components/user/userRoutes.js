var express = require('express');
var router = express.Router();
var passport = require('passport');
var jwt = require('jsonwebtoken');

require('dotenv').config();
JWT_SECRET = process.env.JWT_SECRET;

const User = require('./userModel');
const userController = require('./userController');

/* /user route */
router.post('/', userController.createUser);

router.get('/', userController.getUsers)

// Endpoint to login
router.post('/login',
  function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
      if (err) { return next(err); }
      if (!user) { return res.json(info); }
      req.logIn(user, function(err) {
        if (err) { return next(err); }

        // create jwt token
        const token = jwt.sign({ id: user.username }, JWT_SECRET);
        info = {
          ...info,
          user: {
            token: token,
            username: user.username
          }
        };

        return res.json(info);
      });
    })(req, res, next);
});

router.post('/login/jwt',
  function(req, res, next) {
    passport.authenticate('jwt', function(err, user, info) {
      if (err) { return next(err); }
      if(info.result == 'error') {
        res.json(info);
      } else {
        // success
        info.user = user;
        res.json(info);
      }
    })(req, res, next);
});

// Endpoint to get current user
router.get('/get', function(req, res){
  res.json(req.user);
})


router.get('/logout', function(req, res) {
  req.logout();
  res.json({
    success: true,
    message: "successfully logged out",
  });
})

module.exports = router;
