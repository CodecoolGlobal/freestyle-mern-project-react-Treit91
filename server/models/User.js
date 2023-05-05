const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: {
    first: String,
    last: String,
  },
  username: String,
  email: String,
  password: String,
  watchlist: Object,
  registeredAt: Date,
});

userSchema.pre('save', function (next) {
  if (this.password && this.isModified('password')) {
    bcrypt.hash(this.password, 10, (err, hashed) => {
      if (err) {
        return next(err);
      }
      this.password = hashed;
      next();
    });
  } else {
    next();
  }
});

userSchema.methods.checkPassword = function (password, cb) {
  bcrypt.compare(password, this.password, (err, result) => {
    return cb(err, result);
  });
};

const User = mongoose.model('User', userSchema);

module.exports = User;
