const express = require("express");
const router = express.Router();
const passport = require("../passport/passport");
// const UserController = require("../../controllers/UserController");

router
  .route("/login")
  .get((req, res) => {
    res.render("login-page", { authenticate: req.isAuthenticated() });
  })
  .post(passport.auth, (req, res) => {
    res.redirect("/");
  });

router.route("/dashboard").get((req, res) => {
  if (req.isAuthenticated()) {
    res.render("dashboard", { authenticate: req.isAuthenticated() });
  } else {
    res.status(404).render("404", { authenticate: req.isAuthenticated() });
  }
});

module.exports = router;
