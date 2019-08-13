const session = require('express-session');
const passport = require('passport')
const passportLocal = require('passport-local');
const passportJWT = require('passport-jwt');
const LocalStrategy = passportLocal.Strategy;
const JWTStrategy = passportJWT.Strategy;
// found in app.js

const handleError = require(__base + 'components/errors/handle.js');
const User = require(__base + 'components/user/userModel.js')

module.exports = (app) => {
  app.use(session({
    secret: 'is this supposed to be sercet??',
    saveUninitialized: true,
    resave: true
  }));

  // Passport init
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(new LocalStrategy({
    usernameField: 'loginInfo'
  },
    async function(loginInfo, password, done) {
      try {
        const user = await User.findByUserOrEmail(loginInfo)
        if(!user) return done(null, false, {
          success: false,
          message: 'Unknown Username, Email, or Password'
        });
        var result = await User.comparePassword(password, user.password);
        if(result) {
          console.log(user.username + " logged in")
          return done(null, user, {
            success: true,
            message: 'Successfully Logged in'
          });
        } else {
          return done(null, false, {
            success: false,
            message: 'Unknown Username, Email, or Password'
          });
        }
      } catch (err) {
        handleError(err);
      }
    }
  ));

  const opts = {
    jwtFromRequest: passportJWT.ExtractJwt.fromBodyField('token'),
    secretOrKey: JWT_SECRET,
    passReqToCallback: true,
  };

  passport.use(
    'jwt',
    new JWTStrategy(opts,
      async (req, jwt_payload, done) => {
        try {
          const user = await User.findOne({
            username: jwt_payload.id,
          });
          if(!user)
            done(null, false, {
              success: false,
              message: 'User Not Found'
            });
          else {
            // some security measures
            delete user.password;
            done(null, user, {
              success: true,
              message: 'User Found'
            });
          }
        } catch (err) {
          handleError(err);
        }
    })
  );

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
