require("dotenv").config();

const express = require("express");
const HomepageRoute = require("./app/routes/homeRoute");
const ProductRoute = require("./app/routes/productRoute");
const UsersRoute = require("./app/routes/userRoute");
const bodyParser = require("body-parser");
const passport = require("passport");
const Strategy = require("passport-local").Strategy;
const UserController = require("./controllers/UserController");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require("morgan")("combined"));
app.use(
  require("express-session")({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.set("view engine", "ejs");

app.use(HomepageRoute);
app.use("/products", ProductRoute);

app.use("/users", UsersRoute);

app.get("/install", UserController.registerPage);
app.post("/install", UserController.register);

/* 404 */
app.get("*", (req, res) => {
  res.status(404).send("Not Found");
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
