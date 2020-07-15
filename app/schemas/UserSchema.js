const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

//Define a schema
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  user_email: {
    type: String
  },
  user_password: {
    type: String
  }
});

const User = (module.exports = mongoose.model("User", UserSchema));

// TODO Deplacer dans le model ********************************
module.exports.createUser = function (newUser, callback) {
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(newUser.user_password, salt, function (err, hash) {
      newUser.user_password = hash;
      newUser.save(callback);
    });
  });
};
// ****************************************************************
