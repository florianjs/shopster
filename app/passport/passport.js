const passport = require("passport");
const Strategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const User = require("../schemas/UserSchema");

passport.use(
  new Strategy(function (username, password, cb) {
    User.findOne({ user_email: username }, function (err, user) {
      if (err) {
        return cb(err);
      }
      if (!user) {
        return cb(null, false);
      }
      bcrypt.compare(password, user.user_password, (err, same) => {
        if (err) {
          console.log(err);
        }
        if (same) {
          return cb(null, user);
        }
      });
    });
  })
);

passport.serializeUser(function (user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function (id, cb) {
  User.findById(id, function (err, user) {
    if (err) {
      return cb(err);
    }
    cb(null, user);
  });
});

module.exports.auth = passport.authenticate("local", {
  failureRedirect: "/users/login"
});
