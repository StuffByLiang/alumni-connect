const session = require('express-session');
const passport = require('passport')
const passportLocal = require('passport-local')
// found in app.js

const handleError = require(__base + '/components/errors/handle.js');
const User = require('./userController.js')

module.exports = (app) => {
  app.use(session({
    secret: 'is this supposed to be sercet??',
    saveUninitialized: true,
    resave: true
  }));

  // Passport init
  app.use(passport.initialize());
  app.use(passport.session());

  let LocalStrategy = passportLocal.Strategy;
  passport.use(new LocalStrategy(
    async function(username, password, done) {
      try {
        const user = await User.findOne({username: username})
        if(!user) return done(null, false, {message: 'Unknown User'});
        var result = await User.comparePassword(password, user.password);
        console.log(result);
        if(result) {
          console.log("logged in")
          return done(null, user);
        } else {
          return done(null, false, {message: 'Invalid password'});
        }
      } catch (err) {
        handleError(err);
      }
    }
  ));

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(async function(id, done) {
    try {
      const user = await User.findOne({id: id});
      done(null, user);
    } catch (err) {
      handleError(err);
      done(err, user);
    }
  });
}
