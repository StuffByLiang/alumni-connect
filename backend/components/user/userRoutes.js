var express = require('express');
var router = express.Router();
var passport = require('passport');
var jwt = require('jsonwebtoken');
var path = require('path');


require('dotenv').config();
JWT_SECRET = process.env.JWT_SECRET;

const User = require('./userModel');
const userController = require('./userController');

const isAuthenticated = require(__base + 'middleware/isAuthenticated')

// setting up multer
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__base + '../frontend/public/profile-images/'))
  },
  filename: function (req, file, cb) {
    cb(null, req.user.id + '.' + file.originalname.split('.')[1])
  }
});

var uploadImage = multer({
  storage: storage,
  onError : function(err, next) {
    console.log('error', err);
    next(err);
  }
}).single('image');

/* /user route */
router.post('/create', isAuthenticated, userController.createUser);

router.get('/', userController.getUsers)

router.post('/update', isAuthenticated, (req, res) => {
  uploadImage(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        console.log(err);
      } else if (err) {
        console.log(err);
      }
      // Everything went fine.
      userController.updateUser(req, res);
    })
  });

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
        user.token = token;
        info.user = user;

        return res.json(info);
      });
    })(req, res, next);
});

router.post('/login/jwt',
  function(req, res, next) {
    passport.authenticate('jwt', function(err, user, info) {
      if (err) { return next(err); }
      if (!user) { return res.json(info); }
      req.logIn(user, function(err) {
        if (err) { return next(err); }

        info.user = user;
        return res.json(info);
      });
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
