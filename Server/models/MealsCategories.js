const mongoose = require('mongoose');

const mealscategories = mongoose.model('mealscategories', {
  images: String,
  name: String,
  cate: String,
});

module.exports = { mealscategories };
