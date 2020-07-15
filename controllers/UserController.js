const User = require("../models/UserModel");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

exports.loginPage = (req, res) => {
  res.render("login-page");
};

exports.registerPage = (req, res) => {
  res.render("register-page");
};

exports.register = (req, res) => {
  //console.log(req.body);
  const newUser = new User(req.body);
  const created = newUser.create();
  if (created) {
    res.redirect("/");
  } else {
    res.send("Error");
  }
};

exports.login = (req, res) => {
  passport.use(
    new LocalStrategy((email, password, done) => {
      // TODO probleme here req is undefined
      const user = new User(req.body);
      user.getUserByEmail(email, (err, user) => {
        if (err) throw err;
        if (!user) {
          return done(null, false, { message: "Unknown User" });
        }
      });
      user.comparePassword(password, user.password, (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, { message: "Invalid password" });
        }
      });
    })
  );
};
