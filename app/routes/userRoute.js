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

module.exports = router;
