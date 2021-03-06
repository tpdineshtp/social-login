var passport = require('passport'),
    FacebookStrategy = require('passport-facebook').Strategy,
    SocialLoginHistory = require('../models/socialLoginHistoryModel');

passport.use(new FacebookStrategy({
    clientID: "xxxxxx",
    clientSecret: "xxxxxxx",
    callbackURL: "http://127.0.0.1:3000/auth/facebook/callback",
    profileFields: ['id', 'emails', 'name']
  },
  function(accessToken, refreshToken, profile, done) {
    var new_user = new SocialLoginHistory(profile._json);
    new_user.save(function(err, user) {
      if (err)
        return done(err);
      done(null, user);
    });
  }
));

passport.serializeUser(function (user, fn) {
  fn(null, user);
});

passport.deserializeUser(function (user, fn) {
  fn(null, user);
});

module.exports = passport;
