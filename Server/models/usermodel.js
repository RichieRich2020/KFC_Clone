const mongoose = require('mongoose');

const user = mongoose.model('user', {
  name: String,
  email: String,
  password: String,
  gender: String,
});

module.exports = { user };
