const mongoose = require("mongoose");
const users = require("../app/schemas/UserSchema");
const bcrypt = require("bcrypt");

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));

const UserCallback = (err) => {
  if (err) {
    return false;
  } else {
    return true;
  }
};

module.exports = class Users {
  constructor(u) {
    this.user = u;
  }

  async create() {
    try {
      const hashedPassword = await bcrypt.hash(this.user.user_password, 10);
      const create = new users({
        user_email: this.user.user_email,
        user_password: hashedPassword
      });
      create.save();
      return true;
    } catch {
      console.log("Error");
    }
  }

  getUserByEmail(email, cb) {
    cb = UserCallback;
    let query = { user_email: email };
    users.findOne(query, cb);
  }

  comparePassword(candidatePassword, hash, cb) {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
      if (err) throw err;
      cb(null, isMatch);
    });
  }
};
